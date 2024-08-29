import Head from 'next/head';

import { useRouter } from 'next/router';

export default function Meta({ page }: { page: { title: string, user?: any } }) {
  const router = useRouter();

  let ldJson: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Clyde\'s Real Survival SMP',
    alternateName: [ 'CRSS' ],
    url: 'https://crss.cc'
  };

  if (page.user) {
    ldJson = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: page.user.global_name,
        alternateName: page.user.username,
        identifier: page.user.did,
        image: `https://cdn.discordapp.com/avatars/${page.user.did}/${page.user.avatar}.png`,
      }
    };
  }

  return (
    <Head>
      <title>{page.title} &bull; Clyde&apos;s Real Survival SMP</title>

      <meta name="name" content={`${page.title} &bull; Clyde's Real Survival SMP`} />
      <meta name="description" content="A very cool minecraft SMP that updates to every version starting from b1.0." />
      <meta name="keywords" content="crss, minecraft, beta, alpha, release, new, 1.0, version" />
      <meta name="theme-color" content="#537F53" />

      <meta property="og:site_name" content="Clyde's Real Survival SMP" />
      <meta property="og:title" content={page.title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://crss.fra1.cdn.digitaloceanspaces.com/img/social_image.png" />
      <meta property="og:description" content="A very cool minecraft SMP that updates to every version starting from b1.0." />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${page.title} &bull; Clyde's Real Survival SMP`} />
      <meta name="twitter:description" content="A very cool minecraft SMP that updates to every version starting from b1.0." />
      <meta name="twitter:image" content="https://crss.fra1.cdn.digitaloceanspaces.com/img/social_image.png" />

      <meta property="twitter:domain" content="crss.cc" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      {!page.user && (
        <>
          <meta property="og:url"      content={`https://crss.cc${router.pathname}`} />
          <meta property="twitter:url" content={`https://crss.cc${router.pathname}`} />
        
          <link rel="canonical" href={`https://crss.cc${router.pathname}`} />
        </>
      ) || (
        <>
          <meta property="og:url"      content={`https://crss.cc/u/${page.user!.username}`} />
          <meta property="twitter:url" content={`https://crss.cc/u/${page.user!.username}`} />
        
          <link rel="canonical" href={`https://crss.cc/u/${page.user!.username}`} />
        </>
      )}

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}