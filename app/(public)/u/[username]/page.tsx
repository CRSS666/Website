import ClientTime from '@/components/helpers/ClientTime';
import api from '@/lib/api';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import styles from '@/styles/pages/User.module.scss';
import Link from 'next/link';
import { Badge, Braces, Dog, Globe2, Hand, Handshake } from 'lucide-react';

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
  const userConnections = await api.getUserConnectionsFromUsername(username);
  if (!userConnections) notFound();

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
            {user?.pronouns && (
              <>
                <span style={{ fontSize: '130%' }}>&middot;</span>
                <span data-tooltip={true} data-tooltip-value="Pronouns">
                  {user?.pronouns}
                </span>
              </>
            )}
          </div>
          <span>@{user?.username}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.tabs}>
          <div>
            <ul>
              <li>Tab 1</li>
              <li>Tab 2</li>
              <li>Tab 3</li>
            </ul>
          </div>

          <div className={styles.tabsPages} data-current="feed">
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

          {userConnections.length > 0 && (
            <>
              <hr />
              <div className={styles.linkList}>
                <h6>Links</h6>
                <ul>
                  <li>
                    <span data-tooltip={true} data-tooltip-value="Website">
                      <Globe2 />
                    </span>
                    <Link
                      href="https://theclashfruit.me/?utm_source=crss&utm_medium=social"
                      target="_new"
                    >
                      theclashfruit.me
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

          {user?.badges.length > 0 && (
            <>
              <hr />
              <div className={styles.badgesList}>
                <h6>Badges</h6>

                <ul>
                  {user?.badges.map((badge) => (
                    <li key={badge}>
                      {badge === 'hello_world' && (
                        <span
                          data-tooltip={true}
                          data-tooltip-value="Hello, World!"
                          data-badge={badge}
                        >
                          <Hand size={26} />
                        </span>
                      )}
                      {badge === 'community' && (
                        <span
                          data-tooltip={true}
                          data-tooltip-value="Community"
                          data-badge={badge}
                        >
                          <Handshake size={26} />
                        </span>
                      )}
                      {badge === 'code_contributor' && (
                        <span
                          data-tooltip={true}
                          data-tooltip-value="Code Contributor"
                          data-badge={badge}
                        >
                          <Braces size={26} />
                        </span>
                      )}

                      {badge === 'nothing_to_see' && (
                        <span
                          data-tooltip={true}
                          data-tooltip-value="???"
                          data-badge={badge}
                        >
                          <Dog size={26} />
                        </span>
                      )}

                      {badge.startsWith('placeholder') && (
                        <span
                          data-tooltip={true}
                          data-tooltip-value="Placeholder Badge"
                          data-badge="placeholder"
                        >
                          <Badge size={26} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
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
