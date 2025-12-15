"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

type LeadMeta = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
};

type Props = {
  initialMeta: LeadMeta;
  extraMeta?: Record<string, string>;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpznqjpn";

export default function ContestLeadForm({ initialMeta, extraMeta }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientMeta, setClientMeta] = useState<{ referrer: string; landing_url: string }>({
    referrer: "",
    landing_url: "",
  });

  useEffect(() => {
    setClientMeta({
      referrer: document.referrer ?? "",
      landing_url: window.location.href,
    });
  }, []);

  const meta = useMemo(() => {
    return {
      lead_type: "concurso_shopify_2_0",
      ...initialMeta,
      ...(extraMeta ?? {}),
      referrer: clientMeta.referrer,
      landing_url: clientMeta.landing_url,
    };
  }, [clientMeta.landing_url, clientMeta.referrer, extraMeta, initialMeta]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { errors?: Array<{ message?: string }> }
          | null;
        const message =
          data?.errors?.[0]?.message ??
          "No se pudo enviar el formulario. Intenta de nuevo.";
        throw new Error(message);
      }

      setStatus("success");
      form.reset();

      const w = window as any;
      if (typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", {
          lead_type: "concurso_shopify_2_0",
        });
      }
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead");
      }
      if (typeof w.ttq?.track === "function") {
        w.ttq.track("SubmitForm");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error inesperado.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
        <p className="text-sm font-semibold text-white">Listo. Ya estás participando.</p>
        <p className="mt-2 text-sm text-white/70">
          Si quedas preseleccionado/a, te contactamos por WhatsApp o email.
        </p>
        <a
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black"
          href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
          target="_blank"
          rel="noreferrer"
        >
          Hablar con el Rey de las Paginas
        </a>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      {Object.entries(meta).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value ?? ""} />
      ))}

      <label className="flex flex-col gap-2 text-sm">
        <span>Nombre completo *</span>
        <input
          required
          name="name"
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span>Email *</span>
        <input
          required
          type="email"
          name="email"
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          placeholder="tu@email.com"
          autoComplete="email"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span>WhatsApp *</span>
        <input
          required
          name="phone"
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          placeholder="+56 9 1234 5678"
          autoComplete="tel"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span>Usuario IG/TikTok *</span>
        <input
          required
          name="social"
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          placeholder="@tuusuario"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span>¿Qué vendes? (opcional)</span>
        <textarea
          name="message"
          rows={4}
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          placeholder="Producto/servicio, país, objetivo…"
        />
      </label>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black disabled:opacity-70"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando…" : "Participar"}
      </button>

      {status === "error" && (
        <p className="text-center text-xs text-danger">{errorMessage}</p>
      )}

      <p className="text-center text-xs text-white/60">
        Al enviar, aceptas que te contactemos para el concurso y ofertas relacionadas.
      </p>
    </form>
  );
}
