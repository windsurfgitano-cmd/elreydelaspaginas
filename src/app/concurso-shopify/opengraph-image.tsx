import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#030303",
          color: "#ffffff",
          padding: 64,
          overflow: "hidden",
          justifyContent: "space-between",
          flexDirection: "column",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -200,
            background:
              "radial-gradient(circle at 18% 25%, rgba(212,175,55,0.24) 0%, transparent 58%), radial-gradient(circle at 80% 78%, rgba(34,211,238,0.14) 0%, transparent 58%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
              marginBottom: 18,
            }}
          >
            Concurso
          </div>

          <div
            style={{
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: -2.5,
              lineHeight: 1.02,
            }}
          >
            Shopify 2.0
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 34,
              lineHeight: 1.15,
              color: "rgba(255,255,255,0.80)",
              maxWidth: 980,
            }}
          >
            Gana una tienda lista para vender
          </div>

          <div
            style={{
              marginTop: 22,
              fontSize: 22,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 980,
            }}
          >
            Participa completando el formulario (IG/TikTok).
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 18,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <div style={{ color: "#ffd700", fontWeight: 800 }}>
              elreydelaspaginas.com/concurso-shopify
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)" }}>
              El Rey de las Páginas
            </div>
          </div>

          <div
            style={{
              padding: "10px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              backgroundColor: "rgba(255,255,255,0.06)",
              fontSize: 18,
              color: "#ffd700",
              fontWeight: 700,
            }}
          >
            +56 9 8173 4039
          </div>
        </div>
      </div>
    ),
    size
  );
}
