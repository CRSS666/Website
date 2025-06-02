import api from '@/lib/api';

import { Upload } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  openGraph: {
    title: 'Gallery'
  }
};

export default async function Gallery() {
  const user = await api.getUser();

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <h1 style={{ marginBottom: 0 }}>Gallery</h1>{' '}
        {user && (
          <button
            style={{ height: '24px', display: 'flex', cursor: 'pointer' }}
          >
            <Upload />
            <span style={{ lineHeight: 1 }}>Upload a Picture</span>
          </button>
        )}
      </div>

      <p>It&apos;s empty here :(</p>
    </>
  );
}
