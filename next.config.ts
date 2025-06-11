import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    loader: 'custom',
    loaderFile: './lib/loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.crss.cc',
        pathname: '/**'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  experimental: {
    optimizePackageImports: ['@icons-pack/react-simple-icons']
  }
};

export default nextConfig;
