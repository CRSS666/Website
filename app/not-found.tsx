import Link from 'next/link';

import Layout from '@/components/Layout';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404'
};

export default function NotFound() {
  return (
    <Layout>
      <h1>404 Not Found</h1>

      <p>
        This page is possibly missing but make sure you entered the correct url.
      </p>

      <Link href="/">&lt; Go Home</Link>
    </Layout>
  );
}
