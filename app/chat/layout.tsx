import { Header } from '@/components/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <section className="flex flex-col min-h-screen">
          <Header />
          {children}
        </section>
      </body>
    </html>
  );
}
