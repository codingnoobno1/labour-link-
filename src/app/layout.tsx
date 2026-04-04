import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LabourLink | Verified On-Demand Workforce for Enterprises",
  description: "Connect with verified workers for hotels, hospitals, and events. Real-time matching, automated compliance, and background-checked professionals.",
  keywords: ["on-demand labour", "verified workers", "hospitality staffing", "healthcare staffing", "event staffing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950">
        {children}
      </body>
    </html>
  );
}
