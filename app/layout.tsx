import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Pulse',
  description: 'A platform for AI-powered health coaching',
  metadataBase: new URL('https://pulse.lycee.ai'),
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
