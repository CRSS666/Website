const path = require('path');
const childProcess = require('child_process');

const gitBranch     = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const gitCommit     = childProcess.execSync('git rev-parse HEAD').toString().trim();
const gitCommitTime = childProcess.execSync('git show -s --format=%cI').toString().trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'crss.fra1.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  publicRuntimeConfig: {
    modifiedDate: new Date().getTime(),
    discord: {
      clientId: process.env.DISCORD_CLIENT,
      redirectUri: process.env.DISCORD_REDIRECT,
      api: process.env.DISCORD_API,
      scopes: [
        'identify',
        'email',
        'openid'
      ]
    },
    git: {
      branch: gitBranch,
      commit: {
        sha: gitCommit,
        created: new Date(gitCommitTime)
      }
    }
  },
  generateBuildId: async () => {
    return childProcess.execSync('git rev-parse HEAD').toString().trim();
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [ '@svgr/webpack' ]
    });

    return config;
  },
  experimental: {
    optimizePackageImports: [ '@icons-pack/react-simple-icons' ]
  }
};

module.exports = nextConfig;