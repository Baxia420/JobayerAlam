import type { Metadata } from "next";
import { Fraunces, Inter, Instrument_Serif } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jobayeralam.com"),
  title: {
    default: "Jobayer Alam · Software Engineering Student",
    template: "%s · Jobayer Alam",
  },
  description:
    "Portfolio of Jobayer Alam: independent projects, university coursework, and community involvement.",
  openGraph: {
    title: "Jobayer Alam",
    description: "Software engineering student building things end to end.",
    url: "https://jobayeralam.com",
    siteName: "Jobayer Alam",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrument.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <SiteEffects />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
