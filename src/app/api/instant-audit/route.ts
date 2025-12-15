import { NextResponse } from "next/server";

type InstantAuditRequest = {
  offer?: string;
  audience?: string;
  goal?: string;
  url?: string;
};

type ModelAudit = {
  score_overall?: number;
  scores?: Record<string, number>;
  top_fixes?: string[];
  hero_variants?: Array<{ headline: string; subheadline: string; cta: string }>;
  hooks?: string[];
  best_next_step?: string;
};

function normalizeString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function extractJsonText(value: unknown) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();

  try {
    JSON.parse(trimmed);
    return trimmed;
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return trimmed.slice(start, end + 1);
    }
  }

  return trimmed;
}

function safeJsonParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function readAzureOpenAIOutputText(data: any): string {
  if (typeof data?.output_text === "string") return data.output_text;

  const output = data?.output;
  if (!Array.isArray(output)) return "";

  const parts: string[] = [];

  for (const item of output) {
    const content = item?.content;
    if (!Array.isArray(content)) continue;

    for (const c of content) {
      if (typeof c?.text === "string") parts.push(c.text);
    }
  }

  return parts.join("\n").trim();
}

function readClaudeOutputText(data: any): string {
  const content = data?.content;
  if (!Array.isArray(content)) return "";

  const parts: string[] = [];

  for (const item of content) {
    if (typeof item?.text === "string") parts.push(item.text);
  }

  return parts.join("\n").trim();
}

function buildAuditPrompt(params: {
  offer: string;
  audience: string;
  goal: string;
  url?: string;
}) {
  const { offer, audience, goal, url } = params;

  return [
    "Eres experto/a en CRO + copywriting para vender con tráfico de IG/TikTok.",
    "Devuelve SOLO JSON válido (sin markdown, sin texto extra).",
    "Idioma: español (Chile). Tono: directo, con energía, profesional.",
    "Contexto:",
    `- Qué vende: ${offer}`,
    `- Público objetivo: ${audience}`,
    `- Objetivo inmediato: ${goal}`,
    url ? `- URL (opcional): ${url}` : undefined,
    "\nSchema JSON exacto:",
    "{",
    "  \"score_overall\": 0-100,",
    "  \"scores\": { \"clarity\": 0-100, \"offer\": 0-100, \"trust\": 0-100 },",
    "  \"top_fixes\": [\"...\", \"...\", \"...\"],",
    "  \"hero_variants\": [",
    "    { \"headline\": \"...\", \"subheadline\": \"...\", \"cta\": \"...\" },",
    "    { \"headline\": \"...\", \"subheadline\": \"...\", \"cta\": \"...\" },",
    "    { \"headline\": \"...\", \"subheadline\": \"...\", \"cta\": \"...\" }",
    "  ],",
    "  \"hooks\": [\"...\", \"...\", \"...\", \"...\", \"...\"],",
    "  \"best_next_step\": \"...\"",
    "}",
    "\nRestricciones:",
    "- headlines <= 80 caracteres",
    "- subheadline <= 140 caracteres",
    "- cta <= 30 caracteres",
    "- hooks <= 90 caracteres",
    "- top_fixes: que sean accionables hoy",
  ]
    .filter(Boolean)
    .join("\n");
}

async function callAzureOpenAI(prompt: string) {
  const url = process.env.AZURE_OPENAI_RESPONSES_URL;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const model = process.env.AZURE_OPENAI_MODEL;

  if (!url || !apiKey || !model) {
    throw new Error("Azure OpenAI no está configurado (AZURE_OPENAI_*).");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      model,
      input: [{ role: "user", content: prompt }],
      max_output_tokens: 900,
    }),
  });

  const data = (await res.json().catch(() => null)) as any;

  if (!res.ok) {
    const message =
      typeof data?.error?.message === "string"
        ? data.error.message
        : "Error llamando Azure OpenAI";
    throw new Error(message);
  }

  const text = readAzureOpenAIOutputText(data);
  const jsonText = extractJsonText(text);
  const parsed = safeJsonParse<ModelAudit>(jsonText);

  return {
    raw: text,
    json: parsed,
  };
}

async function callAzureAnthropic(prompt: string) {
  const url = process.env.AZURE_ANTHROPIC_MESSAGES_URL;
  const apiKey = process.env.AZURE_ANTHROPIC_API_KEY;
  const model = process.env.AZURE_ANTHROPIC_MODEL;

  if (!url || !apiKey || !model) {
    throw new Error("Azure Anthropic no está configurado (AZURE_ANTHROPIC_*).");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "Eres experto/a en copywriting de performance y ofertas para tráfico de IG/TikTok.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = (await res.json().catch(() => null)) as any;

  if (!res.ok) {
    const message =
      typeof data?.error?.message === "string"
        ? data.error.message
        : "Error llamando Azure Anthropic";
    throw new Error(message);
  }

  const text = readClaudeOutputText(data);
  const jsonText = extractJsonText(text);
  const parsed = safeJsonParse<ModelAudit>(jsonText);

  return {
    raw: text,
    json: parsed,
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as InstantAuditRequest | null;

  const offer = normalizeString(body?.offer);
  const audience = normalizeString(body?.audience);
  const goal = normalizeString(body?.goal);
  const url = normalizeString(body?.url);

  if (!offer || !audience || !goal) {
    return NextResponse.json(
      { error: "Faltan campos: offer, audience, goal." },
      { status: 400 }
    );
  }

  const prompt = buildAuditPrompt({ offer, audience, goal, url: url || undefined });

  try {
    const [gpt, claude] = await Promise.all([
      callAzureOpenAI(prompt),
      callAzureAnthropic(prompt),
    ]);

    return NextResponse.json({
      ok: true,
      input: { offer, audience, goal, url: url || undefined },
      gpt,
      claude,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Error inesperado.",
      },
      { status: 500 }
    );
  }
}
