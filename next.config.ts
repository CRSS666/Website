import type { NextConfig } from 'next';

import createMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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

export default createMDX({
  options: {
    rehypePlugins: [rehypeSlug]
  }
})(nextConfig);
