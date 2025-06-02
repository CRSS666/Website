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
    type: 'website',
    siteName: "Clyde's Real Survival SMP",
    url: 'https://crss.cc',
    images: [{ url: 'https://cdn.crss.cc/assets/og.webp' }]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#9FD49C' },
    { media: '(prefers-color-scheme: light)', color: '#39693B' }
  ]
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
