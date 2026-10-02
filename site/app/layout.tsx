import { Toaster } from "@roprgm/ui/toast";
import { TooltipProvider } from "@roprgm/ui/tooltip";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { MobileBar, Sidebar } from "@/ui/sidebar";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.roprgm.com"),
  title: { default: "@roprgm/ui", template: "%s · @roprgm/ui" },
  description:
    "A minimal, dark component library for React and Tailwind CSS v4, on Base UI.",
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <TooltipProvider>
          <div className="mx-auto flex max-w-screen-2xl">
            <Sidebar />
            <main className="min-w-0 flex-1">
              <MobileBar />
              {children}
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
