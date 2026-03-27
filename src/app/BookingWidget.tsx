"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "bot" | "user";
  text: string;
  eventLink?: string;
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

export default function BookingWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ConversationState>({ step: "greeting" });
  const [booked, setBooked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendToApi = useCallback(
    async (message: string, currentState: ConversationState) => {
      setLoading(true);
      try {
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, state: currentState }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: data.reply,
            eventLink: data.eventLink,
          },
        ]);
        setState(data.state);
        if (data.booked) setBooked(true);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Error de conexión. Intenta de nuevo. 📱" },
        ]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Auto-send greeting when opened
  useEffect(() => {
    if (open && !initialized.current) {
      initialized.current = true;
      sendToApi("", { step: "greeting" });
    }
  }, [open, sendToApi]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading || booked) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    await sendToApi(text, state);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Markdown renderer: soporta **bold** y [texto](url)
  const renderText = (text: string) => {
    // Primero dividir por links [texto](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    const segments: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Texto antes del link
      if (match.index > lastIndex) {
        const before = text.slice(lastIndex, match.index);
        // Parsear bold en el texto previo
        before.split(/\*\*(.*?)\*\*/g).forEach((p, j) =>
          segments.push(j % 2 === 1 ? <strong key={`b-${lastIndex}-${j}`}>{p}</strong> : <span key={`s-${lastIndex}-${j}`}>{p}</span>)
        );
      }
      // El link clickeable
      segments.push(
        <a
          key={`link-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d4af37", textDecoration: "underline", cursor: "pointer" }}
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    // Texto restante después del último link
    if (lastIndex < text.length) {
      const rest = text.slice(lastIndex);
      rest.split(/\*\*(.*?)\*\*/g).forEach((p, j) =>
        segments.push(j % 2 === 1 ? <strong key={`b-end-${j}`}>{p}</strong> : <span key={`s-end-${j}`}>{p}</span>)
      );
    }

    return segments.length > 0 ? segments : <span>{text}</span>;
  };

  const renderMessage = (msg: Message, i: number) => {
    const isBot = msg.role === "bot";
    return (
      <div
        key={i}
        style={{
          display: "flex",
          justifyContent: isBot ? "flex-start" : "flex-end",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            maxWidth: "85%",
            padding: "10px 14px",
            borderRadius: 14,
            fontSize: 14,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            background: isBot
              ? "rgba(255,255,255,0.06)"
              : "rgba(212,175,55,0.15)",
            color: isBot ? "#e4e4e7" : "#d4af37",
            borderBottomLeftRadius: isBot ? 4 : 14,
            borderBottomRightRadius: isBot ? 14 : 4,
          }}
        >
          {renderText(msg.text)}
          {msg.eventLink && (
            <a
              href={msg.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: 8,
                color: "#d4af37",
                textDecoration: "underline",
              }}
            >
              🔗 Ver en Google Calendar
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Agendar llamada"
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 9998,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #d4af37, #c59f2e)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            boxShadow: "0 4px 20px rgba(212,175,55,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.1)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          📅
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 9999,
            width: "min(380px, 90vw)",
            height: "min(520px, 80vh)",
            background: "#0a0a0a",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            cursor: "auto",  /* restaurar cursor nativo dentro del widget */
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(212,175,55,0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(212,175,55,0.05)",
            }}
          >
            <span
              style={{ color: "#d4af37", fontWeight: 600, fontSize: 15 }}
            >
              👑 El Rey — Agenda tu llamada
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              style={{
                background: "none",
                border: "none",
                color: "#a1a1aa",
                fontSize: 20,
                cursor: "pointer",
                padding: "0 4px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 12px",
            }}
          >
            {messages.map(renderMessage)}
            {loading && (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  padding: "10px 14px",
                }}
              >
                <span
                  className="loading-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#d4af37",
                    display: "inline-block",
                  }}
                />
                <span
                  className="loading-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#d4af37",
                    display: "inline-block",
                  }}
                />
                <span
                  className="loading-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#d4af37",
                    display: "inline-block",
                  }}
                />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(212,175,55,0.15)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={booked ? "¡Llamada agendada! 🎉" : "Escribe aquí..."}
              disabled={loading || booked}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "#f7f4e8",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || booked || !input.trim()}
              style={{
                background:
                  loading || booked || !input.trim()
                    ? "rgba(212,175,55,0.3)"
                    : "linear-gradient(135deg, #d4af37, #c59f2e)",
                border: "none",
                borderRadius: 10,
                padding: "0 16px",
                cursor:
                  loading || booked || !input.trim()
                    ? "not-allowed"
                    : "pointer",
                color: "#0a0a0a",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
