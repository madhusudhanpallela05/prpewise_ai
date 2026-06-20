import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepWise AI",
  description: "AI Powered Study Planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
