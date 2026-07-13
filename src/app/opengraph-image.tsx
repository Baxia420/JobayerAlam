import { ImageResponse } from "next/og";

export const alt = "Jobayer Alam — Software Engineering Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const rays = [0, 45, 90, 135, 180, 225, 270, 315]
  .map(
    (a) =>
      `<path d="M0,-12 L1.7,-2.2 L0,0 L-1.7,-2.2 Z" transform="rotate(${a})"/>`
  )
  .join("");
// Base64 data URI with an explicit size so satori's SVG rasterizer accepts it.
const spark = (color: string) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="-14 -14 28 28" fill="${color}">${rays}</svg>`
  ).toString("base64")}`;

/**
 * The social/link-preview card. Rendered by next/og at build time. The serif
 * is fetched from the Google Fonts mirror; if that fetch ever fails the card
 * still renders (satori falls back to its bundled font) so the build can't
 * break on a network hiccup.
 */
export default async function Image() {
  let fonts:
    | { name: string; data: ArrayBuffer; style: "normal"; weight: 400 }[]
    | undefined;
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf"
    );
    if (res.ok) {
      fonts = [
        {
          name: "Instrument Serif",
          data: await res.arrayBuffer(),
          style: "normal",
          weight: 400,
        },
      ];
    }
  } catch {
    // keep fonts undefined → default font, build still succeeds
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf6ef",
          padding: "78px 84px",
          position: "relative",
          fontFamily: "Instrument Serif, serif",
        }}
      >
        <img
          width={560}
          height={560}
          src={spark("#2d4a3e")}
          style={{ position: "absolute", top: "35px", right: "0px", opacity: 0.06 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img width={26} height={26} src={spark("#2d4a3e")} />
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "7px",
              color: "#2d4a3e",
              fontFamily: "sans-serif",
            }}
          >
            SOFTWARE ENGINEERING STUDENT
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "96px", color: "#1a1a18", lineHeight: 1.02 }}>
            I&rsquo;m Jobayer Alam.
          </div>
          <div style={{ fontSize: "96px", color: "#2d4a3e", lineHeight: 1.02 }}>
            I build software, end to end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "27px",
            color: "#57544c",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>jobayeralam.com</div>
          <div style={{ display: "flex" }}>
            Projects · About · Involvement
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) }
  );
}
