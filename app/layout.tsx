import { Open_Sans } from 'next/font/google';

import type { Metadata, Viewport } from 'next';

import '@/styles/globals.scss';

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
  return (
    <html lang="en">
      <body className={openSans.variable}>{children}</body>
    </html>
  );
}
