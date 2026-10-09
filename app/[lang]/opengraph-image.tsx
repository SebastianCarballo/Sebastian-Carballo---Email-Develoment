import { ImageResponse } from "next/og";

export const alt = "inbox.dev — Email Developer: emails que llegan, se ven bien y convierten";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0F1E",
          color: "#fff",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "#00D4FF" }}>{`▮ inbox.dev — email developer`}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 800, lineHeight: 1.05, marginTop: 24, fontFamily: "sans-serif" }}>
          <div>Emails que llegan,</div>
          <div>se ven bien y convierten.</div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 40, fontSize: 24, color: "#94A3B8" }}>
          <span>MJML</span>
          <span>·</span>
          <span>Outlook VML</span>
          <span>·</span>
          <span>Dark mode</span>
          <span>·</span>
          <span style={{ color: "#00E676" }}>● disponible</span>
        </div>
        <div style={{ marginTop: 40, height: 8, width: 400, backgroundColor: "#FF6B35", borderRadius: 4 }} />
      </div>
    ),
    { ...size }
  );
}
