"use client";

import { type FormEvent, useState } from "react";

type ModelAudit = {
  score_overall?: number;
  scores?: Record<string, number>;
  top_fixes?: string[];
  hero_variants?: Array<{ headline: string; subheadline: string; cta: string }>;
  hooks?: string[];
  best_next_step?: string;
};

type ModelResult = {
  raw: string;
  json: ModelAudit | null;
};

type InstantAuditSuccess = {
  ok: true;
  input: {
    offer: string;
    audience: string;
    goal: string;
    url?: string;
  };
  gpt: ModelResult;
  claude: ModelResult;
  generated_at: string;
};

type InstantAuditFailure = {
  ok: false;
  error: string;
};

type InstantAuditResponse = InstantAuditSuccess | InstantAuditFailure;

type Props = {
  onResult?: (result: InstantAuditSuccess) => void;
};

function renderScore(value: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return "--";
  return `${Math.max(0, Math.min(100, Math.round(value)))} / 100`;
}

function ModelCard({ title, data }: { title: string; data: ModelResult }) {
  const audit = data.json;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
        {title}
      </p>

      {audit ? (
        <div className="mt-3 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Score</p>
            <p className="text-sm font-semibold text-gold">
              {renderScore(audit.score_overall)}
            </p>
          </div>

          {audit.top_fixes && audit.top_fixes.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-white">Top fixes</p>
              <ul className="mt-2 space-y-2 text-sm text-white/70">
                {audit.top_fixes.slice(0, 5).map((item, idx) => (
                  <li key={`${title}-fix-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {audit.hero_variants && audit.hero_variants.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-white">Hero + CTA</p>
              <div className="mt-2 grid gap-2">
                {audit.hero_variants.slice(0, 3).map((variant, idx) => (
                  <div
                    key={`${title}-hero-${idx}`}
                    className="rounded-xl border border-white/10 bg-black/30 p-3"
                  >
                    <p className="text-sm font-semibold text-white">
                      {variant.headline}
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      {variant.subheadline}
                    </p>
                    <p className="mt-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      {variant.cta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {audit.hooks && audit.hooks.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-white">Hooks (Reels/TikTok)</p>
              <ul className="mt-2 space-y-2 text-sm text-white/70">
                {audit.hooks.slice(0, 8).map((hook, idx) => (
                  <li key={`${title}-hook-${idx}`}>{hook}</li>
                ))}
              </ul>
            </div>
          )}

          {audit.best_next_step && (
            <div>
              <p className="text-sm font-semibold text-white">Siguiente paso</p>
              <p className="mt-2 text-sm text-white/70">{audit.best_next_step}</p>
            </div>
          )}
        </div>
      ) : (
        <pre className="mt-3 whitespace-pre-wrap text-xs text-white/70">
          {data.raw}
        </pre>
      )}
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <span className="thinking-loader">
      <span className="thinking-icon" aria-hidden="true">
        <span className="thinking-brain">🧠</span>
        <span className="thinking-spark thinking-spark-1" />
        <span className="thinking-spark thinking-spark-2" />
        <span className="thinking-spark thinking-spark-3" />
        <span className="thinking-spark thinking-spark-4" />
        <span className="thinking-spark thinking-spark-5" />
        <span className="thinking-spark thinking-spark-6" />
      </span>
      <span>Pensando…</span>
    </span>
  );
}

export default function InstantAuditPanel({ onResult }: Props) {
  const [offer, setOffer] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("vender más");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<InstantAuditSuccess | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/instant-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer,
          audience,
          goal,
          url: url.trim() ? url.trim() : undefined,
        }),
      });

      const data = (await res.json().catch(() => null)) as InstantAuditResponse | null;

      const errorFromServer =
        data && "error" in data && typeof data.error === "string" ? data.error : null;

      if (!res.ok) {
        throw new Error(
          errorFromServer ||
            `No se pudo generar el diagnóstico (HTTP ${res.status}). Intenta de nuevo.`
        );
      }

      if (!data) {
        throw new Error("No se pudo generar el diagnóstico. Intenta de nuevo.");
      }

      if (data.ok !== true) {
        throw new Error(data.error || "No se pudo generar el diagnóstico.");
      }

      setResult(data);
      setStatus("ready");
      onResult?.(data);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error inesperado.");
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        Diagnóstico express IA
      </p>
      <h3 className="mt-2 text-base font-semibold text-white">
        Score + copy listo en 30s
      </h3>
      <p className="mt-2 text-sm text-white/70">
        Responde 3 cosas y te devuelvo fixes + hooks para vender con IG/TikTok.
      </p>

      <form className="mt-4 grid gap-3" onSubmit={submit}>
        <label className="flex flex-col gap-2 text-sm">
          <span>¿Qué vendes? *</span>
          <input
            required
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
            placeholder="Ej: poleras premium para gym"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span>¿A quién se lo vendes? *</span>
          <input
            required
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
            placeholder="Ej: hombres 18-35 que entrenan 3+ veces/semana"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span>Objetivo hoy *</span>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          >
            <option value="vender más">Vender más</option>
            <option value="capturar más leads">Capturar más leads</option>
            <option value="vender por Shopify">Vender por Shopify</option>
            <option value="agendar llamadas">Agendar llamadas</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span>Tu web/tienda (opcional)</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
            placeholder="https://..."
            inputMode="url"
          />
        </label>

        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black disabled:opacity-70"
          disabled={status === "loading"}
        >
          {status === "loading" ? <ThinkingIndicator /> : "Dame mi diagnóstico"}
        </button>

        {status === "error" && (
          <p className="text-center text-xs text-danger">{errorMessage}</p>
        )}

        {status === "idle" && (
          <p className="text-center text-xs text-white/60">
            No guardamos tu respuesta. Si te sirve, participa abajo.
          </p>
        )}
      </form>

      {result && (
        <div className="mt-6 grid gap-4">
          <ModelCard title="GPT 5.2" data={result.gpt} />
          <ModelCard title="Claude Opus 4.5" data={result.claude} />
        </div>
      )}
    </div>
  );
}
