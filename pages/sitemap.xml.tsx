import Database from '@/lib/Database';

import getConfig from 'next/config';

export default function SiteMap() {
  // it's the server's job!
}

export async function getServerSideProps({ res }) {
  const { publicRuntimeConfig } = getConfig();

  const isoString = new Date(publicRuntimeConfig.modifiedDate).toISOString();

  const pages = [
    {
      loc: 'https://crss.cc',
      lastmod: isoString,
      priority: 1.00
    },
    {
      loc: 'https://crss.cc/rules',
      lastmod: isoString,
      priority: 0.90
    },
    {
      loc: 'https://crss.cc/about',
      lastmod: isoString,
      priority: 0.90
    },
    {
      loc: 'https://crss.cc/gallery',
      lastmod: isoString,
      priority: 0.90
    },
    {
      loc: 'https://crss.cc/map',
      lastmod: isoString,
      priority: 0.90
    },
    {
      loc: 'https://crss.cc/nations',
      lastmod: isoString,
      priority: 0.90
    },
    {
      loc: 'https://crss.cc/legal/privacy',
      lastmod: isoString,
      priority: 0.90
    },
    {
      loc: 'https://crss.cc/legal/tos',
      lastmod: isoString,
      priority: 0.90
    }
  ];

  const db = new Database();

  const users = await db.getUsers();
  const nations = await db.getNations();

  if (users) {
    users.forEach(user => {
      pages.push({
        loc: `https://crss.cc/u/${user.username}`,
        lastmod: user.updatedAt.toISOString(),
        priority: 0.80
      });
    });
  }

  if (nations) {
    nations.forEach(nation => {
      pages.push({
        loc: `https://crss.cc/nation/${nation.code}`,
        lastmod: nation.updatedAt.toISOString(),
        priority: 0.80
      });
    });
  }

  let tmp = '';

  pages.forEach(page => {
    tmp += '\n  <url>';
    tmp += `\n    <loc>${page.loc}</loc>`;
    tmp += `\n    <lastmod>${page.lastmod}</lastmod>`;
    tmp += `\n    <priority>${page.priority}</priority>`;
    tmp += '\n  </url>';
  });

  const siteMap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${tmp}\n</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(siteMap);
  res.end();

  return {
    props: {},
  };
}