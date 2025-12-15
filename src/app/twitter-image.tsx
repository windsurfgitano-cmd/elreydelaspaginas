import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
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
              "radial-gradient(circle at 18% 30%, rgba(255,215,0,0.20) 0%, transparent 58%), radial-gradient(circle at 82% 70%, rgba(192,132,252,0.14) 0%, transparent 58%)",
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
            Digital Design & Web Experience
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            El Rey de las Páginas
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 30,
              lineHeight: 1.2,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 980,
            }}
          >
            Landing premium + performance para convertir tráfico en ventas.
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
            <div>Funnels · Shopify · Ads · Automatización</div>
            <div style={{ color: "rgba(255,255,255,0.55)" }}>elreydelaspaginas.com</div>
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
