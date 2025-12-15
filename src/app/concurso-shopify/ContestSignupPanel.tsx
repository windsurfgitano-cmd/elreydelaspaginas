"use client";

import { useMemo, useState } from "react";
import ContestLeadForm from "./ContestLeadForm";
import InstantAuditPanel from "./InstantAuditPanel";

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

type Props = {
  initialMeta: LeadMeta;
};

function safeStringify(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

export default function ContestSignupPanel({ initialMeta }: Props) {
  const [audit, setAudit] = useState<InstantAuditSuccess | null>(null);

  const extraMeta = useMemo(() => {
    if (!audit) return undefined;

    return {
      instant_audit_offer: audit.input.offer,
      instant_audit_audience: audit.input.audience,
      instant_audit_goal: audit.input.goal,
      instant_audit_url: audit.input.url ?? "",
      instant_audit_generated_at: audit.generated_at,
      instant_audit_gpt: audit.gpt.json ? safeStringify(audit.gpt.json) : audit.gpt.raw,
      instant_audit_claude: audit.claude.json
        ? safeStringify(audit.claude.json)
        : audit.claude.raw,
    };
  }, [audit]);

  return (
    <>
      <InstantAuditPanel onResult={setAudit} />
      <ContestLeadForm initialMeta={initialMeta} extraMeta={extraMeta} />
    </>
  );
}
