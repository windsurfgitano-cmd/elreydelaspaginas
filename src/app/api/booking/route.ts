import { NextRequest, NextResponse } from "next/server";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const TIMEZONE = "America/Santiago";

interface TokenData {
  access_token: string;
  refresh_token: string;
  expiry_date?: number;
  token_type?: string;
  client_id?: string;
  client_secret?: string;
}

interface ConversationState {
  step: string;
  name?: string;
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  slots?: { iso: string; label: string }[];
}

async function readToken(): Promise<TokenData> {
  // In Vercel serverless: use env vars
  return {
    access_token: "",
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
}

async function writeToken(token: TokenData): Promise<void> {
  // Token refresh successful (not persisted in serverless env)
}

async function refreshTokenIfNeeded(): Promise<string> {
  const token = await readToken();

  if (token.expiry_date && Date.now() < token.expiry_date - 60_000) {
    return token.access_token;
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const updated: TokenData = {
    ...token,
    access_token: data.access_token,
    expiry_date: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  await writeToken(updated);
  return updated.access_token;
}

function getDayName(date: Date): string {
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  return days[date.getDay()];
}

function getMonthName(date: Date): string {
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];
  return months[date.getMonth()];
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

async function getAvailableSlots(
  accessToken: string,
  count: number = 6
): Promise<{ iso: string; label: string }[]> {
  const now = new Date();
  const maxDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const timeMin = now.toISOString();
  const timeMax = maxDate.toISOString();

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`
  );
  url.searchParams.set("timeMin", timeMin);
  url.searchParams.set("timeMax", timeMax);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("timeZone", TIMEZONE);
  url.searchParams.set("maxResults", "250");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Calendar API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const busyRanges: { start: number; end: number }[] = (data.items ?? []).map(
    (ev: { start?: { dateTime?: string }; end?: { dateTime?: string } }) => ({
      start: new Date(ev.start?.dateTime ?? "").getTime(),
      end: new Date(ev.end?.dateTime ?? "").getTime(),
    })
  );

  const slots: { iso: string; label: string }[] = [];
  const cursor = new Date(now);
  // Round up to next 15-min slot
  cursor.setSeconds(0, 0);
  const mins = cursor.getMinutes();
  const nextSlotMin = Math.ceil(mins / 15) * 15;
  cursor.setMinutes(nextSlotMin);

  while (slots.length < count && cursor < maxDate) {
    const day = cursor.getDay();
    const hour = cursor.getHours();
    const minute = cursor.getMinutes();

    // Skip weekends
    if (day === 0 || day === 6) {
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(10, 0, 0, 0);
      continue;
    }

    // Before business hours
    if (hour < 10) {
      cursor.setHours(10, 0, 0, 0);
      continue;
    }

    // After business hours (last slot at 18:45 for 15-min meeting ending at 19:00)
    if (hour >= 19 || (hour === 18 && minute > 45)) {
      cursor.setDate(cursor.getDate() + 1);
      cursor.setHours(10, 0, 0, 0);
      continue;
    }

    const slotStart = cursor.getTime();
    const slotEnd = slotStart + 15 * 60 * 1000;

    const isBusy = busyRanges.some(
      (r) => slotStart < r.end && slotEnd > r.start
    );

    if (!isBusy) {
      const label = `${getDayName(cursor)} ${cursor.getDate()} ${getMonthName(cursor)} — ${pad(cursor.getHours())}:${pad(cursor.getMinutes())}`;
      slots.push({ iso: cursor.toISOString(), label });
    }

    cursor.setMinutes(cursor.getMinutes() + 15);
  }

  return slots;
}

async function createCalendarEvent(
  accessToken: string,
  startIso: string,
  name: string,
  summary: string
): Promise<string> {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  const event = {
    summary: `Llamada con ${name} — El Rey de las Páginas`,
    description: summary,
    start: { dateTime: start.toISOString(), timeZone: TIMEZONE },
    end: { dateTime: end.toISOString(), timeZone: TIMEZONE },
  };

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!res.ok) {
    throw new Error(`Create event failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.htmlLink ?? "";
}

const EMOJI_NUMBERS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = (body.message ?? "").trim();
    const state: ConversationState = body.state ?? { step: "greeting" };

    let reply = "";
    const newState = { ...state };

    switch (state.step) {
      case "greeting": {
        reply =
          "👑 ¡Hola! Soy el asistente de **El Rey de las Páginas**.\n\nMe encantaría agendar una llamada gratuita para conocer tu proyecto.\n\n¿Cómo te llamas?";
        newState.step = "q1";
        break;
      }

      case "q1": {
        // Extraer solo el nombre del mensaje (ej: "hola mi nombre es Oscar" → "Oscar")
        const nameMatch = message.match(/(?:soy|llamo|nombre es|me llaman|llaman)\s+([A-Za-záéíóúÁÉÍÓÚñÑ]+)/i);
        const cleanName = nameMatch ? nameMatch[1] : message.split(/[\s,]+/).find(w => w.length > 2 && /^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/.test(w)) || message.split(/\s+/)[0];
        newState.name = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
        reply = `¡Un gusto, ${newState.name}! 🤝\n\n¿Tienes tienda online actualmente o quieres crear una desde cero?`;
        newState.step = "q2";
        break;
      }

      case "q2": {
        newState.q1 = message;
        reply =
          "Perfecto. ¿Cuál es tu mayor dolor hoy?\n\n• Ventas bajas\n• Diseño anticuado\n• Velocidad lenta\n• Necesito e-commerce\n• Otro";
        newState.step = "q3";
        break;
      }

      case "q3": {
        newState.q2 = message;
        reply =
          "¿Cuánto es tu presupuesto aproximado?\n\n• $300-500 USD\n• $500-1.000 USD\n• $1.000+ USD\n• No estoy seguro aún";
        newState.step = "q4";
        break;
      }

      case "q4": {
        newState.q3 = message;
        reply =
          "¿Para cuándo lo necesitas?\n\n• 🔥 Urgente (esta semana)\n• 📅 En 1-2 meses\n• 🔍 Solo estoy explorando";
        newState.step = "slots";
        break;
      }

      case "slots": {
        newState.q4 = message;
        try {
          const accessToken = await refreshTokenIfNeeded();
          const slots = await getAvailableSlots(accessToken, 6);

          if (slots.length === 0) {
            reply =
              "No encontré horarios disponibles en los próximos días. Por favor contáctanos por WhatsApp para coordinar. 📱";
            newState.step = "greeting";
            break;
          }

          newState.slots = slots;
          const slotList = slots
            .map((s, i) => `${EMOJI_NUMBERS[i]} ${s.label}`)
            .join("\n");

          reply = `¡Genial, ${newState.name}! Estos son los próximos horarios disponibles para una llamada de 15 min:\n\n${slotList}\n\nEscribe el número del horario que prefieras 👆`;
          newState.step = "confirm";
        } catch (err) {
          console.error("Calendar error:", err);
          reply =
            "Hubo un error al consultar los horarios. Por favor intenta de nuevo o contáctanos por WhatsApp. 📱";
        }
        break;
      }

      case "confirm": {
        const choice = parseInt(message, 10);
        const slots = state.slots ?? [];

        if (isNaN(choice) || choice < 1 || choice > slots.length) {
          reply = `Por favor elige un número del 1 al ${slots.length} 🙏`;
          break;
        }

        const selected = slots[choice - 1];
        try {
          const accessToken = await refreshTokenIfNeeded();
          const summary = [
            `Nombre: ${state.name}`,
            `Tienda: ${state.q1}`,
            `Dolor: ${state.q2}`,
            `Presupuesto: ${state.q3}`,
            `Urgencia: ${state.q4}`,
          ].join("\n");

          const eventLink = await createCalendarEvent(
            accessToken,
            selected.iso,
            state.name ?? "Cliente",
            summary
          );

          reply = `✅ **¡Listo, ${state.name}!** Tu llamada está agendada:\n\n📅 ${selected.label}\n⏱️ 15 minutos\n\n${eventLink ? `🔗 [Ver en Google Calendar](${eventLink})\n\n` : ""}¡Nos vemos pronto! 👑`;
          return NextResponse.json({
            reply,
            state: { step: "done" },
            booked: true,
            eventLink,
          });
        } catch (err) {
          console.error("Booking error:", err);
          reply =
            "Hubo un error al crear la cita. Por favor intenta de nuevo o contáctanos por WhatsApp. 📱";
        }
        break;
      }

      case "done": {
        reply =
          "¡Tu llamada ya está agendada! 🎉 Si necesitas cambiar algo, contáctanos por WhatsApp. 📱";
        break;
      }

      default: {
        reply =
          "👑 ¡Hola! Soy el asistente de **El Rey de las Páginas**.\n\n¿Cómo te llamas?";
        newState.step = "q1";
      }
    }

    return NextResponse.json({ reply, state: newState });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { reply: "Error interno. Por favor intenta de nuevo.", state: { step: "greeting" } },
      { status: 500 }
    );
  }
}
