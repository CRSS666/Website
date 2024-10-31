import {
  Menu,
  Home,
  Scale,
  AtSign,
  Images,
  Map,
  Gamepad,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  LogIn,
  Earth,
  X,
  PlusIcon,
  Plus,
} from 'lucide-react';

import Link from 'next/link';

import styles from '@/styles/NavBar.module.scss';

import { getCookie } from '@/utils/cookies';

import Logo from '@/public/logo.svg';

import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import { useUser } from '@/context/UserContext';

import { Permission, hasPermission } from '@/utils/permissions';

export default function NavBar({ currentPage }: { currentPage: string }) {
  const { user, isLoggedIn } = useUser();

  const [navOpen, setNavOpen] = useState(false);

  const { publicRuntimeConfig } = getConfig();

  const router = useRouter();

  const server = {
    version: '1.19.4',
  };

  const buildDiscordUrl = (): string => {
    const url = new URL('https://discord.com/api/oauth2/authorize');

    url.searchParams.append('client_id', publicRuntimeConfig.discord.clientId);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append(
      'redirect_uri',
      publicRuntimeConfig.discord.redirectUri
    );
    url.searchParams.append(
      'scope',
      publicRuntimeConfig.discord.scopes.join(' ')
    );

    url.searchParams.append('state', router.asPath);

    return url.toString();
  };

  return (
    <>
      <header className={styles.pageHero}>
        <div className={styles.heroOverlay}>
          <div className={styles.container}>
            <div>
              <Logo />

              <h1>Clyde&apos;s Real Survival SMP</h1>
            </div>

            <div>
              <label htmlFor="ip">Server Address:</label>

              <input
                type="text"
                value="play.crss.cc"
                id="ip"
                readOnly
                size={8}
              />

              <label htmlFor="ip">Version: {server.version}</label>
            </div>
          </div>
        </div>
      </header>

      <nav className={`${styles.navBar} ${navOpen ? styles.navOpen : ''}`}>
        <div className={styles.container}>
          <div className={styles.navMobileContainer}>
            <button
              className={styles.navToggle}
              onClick={() => {
                setNavOpen(!navOpen);
              }}
            >
              {!navOpen ? <Menu /> : <X />}
            </button>
          </div>

          <div className={styles.navCollapse}>
            <ul>
              <li>
                <Link
                  href={currentPage == 'home' ? '#' : '/'}
                  className={currentPage == 'home' ? styles.active : ''}
                >
                  <Home />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={currentPage == 'rules' ? '#' : '/rules'}
                  className={currentPage == 'rules' ? styles.active : ''}
                >
                  <Scale />
                  Rules
                </Link>
              </li>
              <li>
                <Link
                  href={currentPage == 'about' ? '#' : '/about'}
                  className={currentPage == 'about' ? styles.active : ''}
                >
                  <AtSign />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={currentPage == 'gallery' ? '#' : '/gallery'}
                  className={currentPage == 'gallery' ? styles.active : ''}
                >
                  <Images />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href={currentPage == 'map' ? '#' : '/map'}
                  className={currentPage == 'map' ? styles.active : ''}
                >
                  <Map />
                  Map
                </Link>
              </li>
              <li>
                <Link
                  href={currentPage == 'nations' ? '#' : '/nations'}
                  className={currentPage == 'nations' ? styles.active : ''}
                >
                  <Earth />
                  Nations
                </Link>
              </li>
            </ul>

            <ul>
              {isLoggedIn && user && (
                <li>
                  {(hasPermission(user.permissions, Permission.Admin) && (
                    <Dropdown
                      items={[
                        {
                          icon: User,
                          label: 'Profile',
                          href: `/u/${
                            user ? user.names.username : 'Loading...'
                          }`,
                        },
                        {
                          icon: Settings,
                          label: 'Settings',
                          href: '/settings',
                        },
                        {
                          icon: Plus,
                          label: 'Premium+',
                          href: '/pp',
                        },
                        {
                          divider: true,
                        },
                        {
                          icon: LayoutDashboard,
                          label: 'Admin',
                          href: '/admin',
                        },
                        {
                          icon: LogOut,
                          label: 'Logout',
                          onClick: async (e) => {
                            e.preventDefault();

                            await fetch('/api/v1/session', {
                              method: 'DELETE',
                            });

                            router.reload();
                          },
                        },
                      ]}
                      className={styles.dropDown}
                    >
                      <User />

                      {user ? user.names.global_name : 'Loading...'}
                    </Dropdown>
                  )) || (
                    <Dropdown
                      items={[
                        {
                          icon: User,
                          label: 'Profile',
                          href: `/u/${
                            user ? user.names.username : 'Loading...'
                          }`,
                        },
                        {
                          icon: Settings,
                          label: 'Settings',
                          href: '/settings',
                        },
                        {
                          divider: true,
                        },
                        {
                          icon: LogOut,
                          label: 'Logout',
                          onClick: async (e) => {
                            e.preventDefault();

                            await fetch('/api/v1/session', {
                              method: 'DELETE',
                            });

                            router.reload();
                          },
                        },
                      ]}
                      className={styles.dropDown}
                    >
                      <User />

                      {user ? user.names.global_name : 'Loading...'}
                    </Dropdown>
                  )}
                </li>
              )}
              {!isLoggedIn && !user && (
                <li>
                  <Link href={buildDiscordUrl()}>
                    <LogIn />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
