import ClientTime from '@/components/helpers/ClientTime';
import api from '@/lib/api';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import styles from '@/styles/pages/User.module.scss';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';

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

  const colour = `#${user?.accent_color.toString(16).padStart(6, '0')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    identifier: username,
    name: user?.display_name,
    image: `https://cdn.crss.cc/avatars/${user?.id}/${user?.avatar}.webp`
  };

  return (
    <>
      <div className={styles.userHeader}>
        <div className={styles.userBanner} style={{ background: colour }}>
          {user.banner && (
            <Image
              src={`https://cdn.crss.cc/banners/${user?.id}/${user?.avatar}.webp`}
              height={220}
              width={1100}
              quality={100}
              alt="profile picture"
            />
          )}
        </div>

        <Image
          className={styles.userAvatar}
          src={`https://cdn.crss.cc/avatars/${user?.id}/${user?.avatar}.webp`}
          height={128}
          width={128}
          quality={100}
          alt="profile picture"
        />

        <div className={styles.userNames}>
          <div className={styles.displayName}>
            <h1>{user?.display_name}</h1>
            <span style={{ fontSize: '130%' }}>&middot;</span>
            <span data-tooltip={true} data-tooltip-value="Pronouns">
              she/her
            </span>
          </div>
          <span>@{user?.username}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.tabs}>
          <div>
            <ul>
              <li>Feed</li>
              <li>Gallery</li>
              <li>Raw</li>
            </ul>
          </div>

          <div className={styles.tabsPages} data-current="feed">
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
        </div>

        <div className={styles.sideBar}>
          <div className={styles.infoList}>
            <h6>Information</h6>
            <ul>
              <li>
                <span>Joined</span>
                <span
                  data-tooltip={true}
                  data-tooltip-value={new Date(user!.created).toLocaleString(
                    'en-GB'
                  )}
                >
                  <ClientTime
                    timestamp={user!.created}
                    locale="en-GB"
                    relative={true}
                  />
                </span>
              </li>
              <li>
                <span>Role</span>
                <span>{user?.role ? user?.role : 'Player'}</span>
              </li>
              <li>
                <span>Minecraft</span>
                {user?.minecraft_id ? (
                  <span>{user?.minecraft_id}</span>
                ) : (
                  <span
                    style={{ fontStyle: 'italic' }}
                    data-tooltip={true}
                    data-tooltip-value="This user has not connected their Minecraft account to their CRSS account yet."
                  >
                    Not Linked
                  </span>
                )}
              </li>
            </ul>
          </div>

          <hr />

          <div className={styles.linkList}>
            <h6>Links</h6>
            <ul>
              <li>
                <Globe2 />
                <Link href="https://theclashfruit.me">theclashfruit.me</Link>
              </li>
            </ul>
          </div>
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
