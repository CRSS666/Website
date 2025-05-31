import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.crss.cc',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
