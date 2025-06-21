import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Yi (Cherry) Lian - Robotics Engineer & ML Researcher",
    template: "%s | Yi (Cherry) Lian",
  },
  description: "Robotics Engineer and Machine Learning Researcher specializing in Human-Robot Interaction, SLAM, and autonomous systems. MS in Robotics at Georgia Tech.",
  keywords: ["robotics", "machine learning", "SLAM", "human-robot interaction", "computer vision", "autonomous systems"],
  authors: [{ name: "Yi (Cherry) Lian" }],
  creator: "Yi (Cherry) Lian",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cherry-lian.vercel.app",
    title: "Yi (Cherry) Lian - Robotics Engineer & ML Researcher",
    description: "Robotics Engineer and Machine Learning Researcher specializing in Human-Robot Interaction, SLAM, and autonomous systems.",
    siteName: "Yi (Cherry) Lian Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yi (Cherry) Lian - Robotics Engineer & ML Researcher",
    description: "Robotics Engineer and Machine Learning Researcher specializing in Human-Robot Interaction, SLAM, and autonomous systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 