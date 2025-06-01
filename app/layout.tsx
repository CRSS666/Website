import { Open_Sans } from 'next/font/google';

import Script from 'next/script';

import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

import '@/styles/globals.scss';

import type { Metadata, Viewport } from 'next';
import api from '@/lib/api';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--fontOpenSans'
});

export const metadata: Metadata = {
  title: {
    template: "%s • Clyde's Real Survival SMP",
    default: "Clyde's Real Survival SMP"
  },
  description:
    'A very cool minecraft SMP that updates to every version starting from b1.0.',
  keywords: [
    'crss',
    'minecraft',
    'factions',
    'nations',
    'server',
    'mc',
    'modern',
    'beta',
    'b1.7.4'
  ],
  category: 'gaming',
  openGraph: {
    siteName: "Clyde's Real Survival SMP"
  }
};

export const viewport: Viewport = {
  themeColor: '#537F53'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await api.getUser();

  return (
    <html lang="en">
      <body className={openSans.variable}>
        <Header />
        <NavBar user={user} />

        <main>{children}</main>

        {/*
        <Script
          src="https://rybbit.theclashfruit.me/api/script.js"
          data-site-id="3"
          defer
        />
        */}
      </body>
    </html>
  );
}
