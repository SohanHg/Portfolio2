import type { Metadata, Viewport } from "next";
import { Oswald, Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CinematicVideo from "@/components/CinematicVideo";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030303",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Sohan H G | Full-Stack & AI Engineer",
  description:
    "Cyberpunk editorial portfolio of Sohan H G — Full-Stack & AI Software Engineer specializing in React, Java, Firebase, and Gemini AI trip orchestration systems.",
  keywords: ["Sohan H G", "Full-Stack Engineer", "Software Developer", "React", "Java", "AI Engineer", "Portfolio"],
  authors: [{ name: "Sohan H G" }],
  openGraph: {
    title: "Sohan H G | Full-Stack & AI Engineer",
    description: "Building ideas into high-performance software and AI-orchestrated web experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohan H G | Full-Stack & AI Engineer",
    description: "Building ideas into high-performance software and AI-orchestrated web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-grotesk antialiased`}
      >
        <LenisProvider>
          <CinematicVideo />
          <Navbar />
          <CustomCursor />

          <div className="cine-vignette" />
          <div className="cine-grain" />
          <div className="cine-scan" />
          <div id="cine-glow" className="cine-glow" />

          <main className="relative z-20">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
