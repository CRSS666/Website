import ClientTime from '@/components/helpers/ClientTime';
import api from '@/lib/api';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  {
    params
  }: {
    params: Promise<{ username: string }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params;
  const base = await parent;

  const user = await api.getUserFromUsername(username);
  if (!user) return {};

  return {
    title: user.display_name,
    // @ts-expect-error This is to hack some nextjs jank!
    openGraph: {
      ...base.openGraph,
      type: 'profile',
      title: user.display_name,
      username: user.display_name
    }
  };
}

export default async function Servers({
  params
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await api.getUserFromUsername(username);
  if (!user) notFound();

  const colour = (() => {
    const hex = `#${user?.accent_color.toString(16).padStart(6, '0')}`;
    const percent = -25;

    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);
    R = (R * (100 + percent)) / 100;
    G = (G * (100 + percent)) / 100;
    B = (B * (100 + percent)) / 100;
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    return `rgba(${R}, ${G}, ${B}, 0.65)`;
  })();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    identifier: username,
    name: user?.display_name,
    image: `https://cdn.crss.cc/avatars/${user?.id}/${user?.avatar}.webp`
  };

  return (
    <>
      <div>
        <div
          style={{
            width: '100%',
            height: '220px',
            background:
              'conic-gradient(from 212deg at 50% 50%, var(--onSecondaryFixedVariant) 73.28690350055695deg, var(--primaryFixed) 189.95867729187012deg, var(--onPrimaryFixed) 279.0387225151062deg, var(--secondaryFixed) 360deg)',
            border: '1px solid var(--outlineVariant)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          {user.banner ? (
            <Image
              src={`https://cdn.crss.cc/banners/${user?.id}/${user?.avatar}.webp`}
              height={220}
              width={1100}
              quality={100}
              alt="profile picture"
            />
          ) : (
            <div
              style={{
                background: colour,
                backdropFilter: 'blur(32px)',
                width: '100%',
                height: '100%'
              }}
            />
          )}
        </div>

        <Image
          src={`https://cdn.crss.cc/avatars/${user?.id}/${user?.avatar}.webp`}
          height={256}
          width={256}
          quality={100}
          alt="profile picture"
        />

        <div>
          <h1>{user?.display_name}</h1>
          <span>@{user?.username}</span>
        </div>
      </div>

      <ul>
        <li>
          Joined: <ClientTime timestamp={user!.created} locale="en-GB" />
        </li>
        <li>Minecraft: {user?.minecraft_id ? user?.minecraft_id : 'N/A'}</li>
      </ul>

      <div>
        <ul>
          <li>Feed</li>
          <li>Gallery</li>
          <li>Raw</li>
        </ul>
      </div>

      <div data-current="feed">
        <div data-tab="feed">
          <ol>
            <li>Hello, World!</li>
          </ol>
        </div>
        <div data-tab="gallery">
          <p>pwetty pwease</p>
        </div>
        <div data-tab="raw">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </>
  );
}
