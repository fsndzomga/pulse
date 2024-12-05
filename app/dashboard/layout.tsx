'use client';

import Link from 'next/link';
import { CircleIcon } from 'lucide-react';

function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">PULSE</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/chat"
            className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
          >
            Get AI Coaching
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
