'use client';

export default function cloadflareLoader({
  src,
  width,
  quality
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=webp'];

  if (src.startsWith('https://cdn.'))
    return `https://cdn.crss.cc/cdn-cgi/image/${params.join(',')}/${src.replace('https://cdn.crss.cc/', '')}`;
  else return `https://crss.cc/cdn-cgi/image/${params.join(',')}/${src}`;
}
