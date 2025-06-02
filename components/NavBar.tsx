'use client';

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
  Server,
  PlusIcon,
  Plus
} from 'lucide-react';

import { usePathname } from 'next/navigation';

import type { NavItem } from '@/lib/types/navitems';

import styles from '@/styles/components/NavBar.module.scss';
import { renderNavItem } from './helpers/NavItemRenderer';
import { logout } from '@/app/actions';

export default function NavBar({ user }: { user: any | null }) {
  const path = usePathname();

  const discordUrl = (() => {
    const url = new URL('https://discord.com/api/oauth2/authorize');

    url.searchParams.append(
      'client_id',
      process.env.NEXT_PUBLIC_DISCORD_CLIENT!
    );
    url.searchParams.append('response_type', 'code');
    url.searchParams.append(
      'redirect_uri',
      process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
    );
    url.searchParams.append('scope', ['identify', 'email'].join(' '));
    url.searchParams.append(
      'state',
      btoa(
        JSON.stringify({
          type: 'redirect',
          url: `http://localhost:3000${path}` /*`https://crss.cc${path}`*/
        })
      )
    );

    return url.toString();
  })();

  const leftNavItems: NavItem[] = [
    {
      type: 'page',
      icon: Home,
      title: 'Home',
      href: '/'
    },
    {
      type: 'page',
      icon: AtSign,
      title: 'About',
      href: '/about'
    },
    {
      type: 'page',
      icon: Server,
      title: 'Servers',
      href: '/servers'
    },
    {
      type: 'page',
      icon: Images,
      title: 'Gallery',
      href: '/gallery'
    },
    {
      type: 'page',
      icon: Earth,
      title: 'Nations',
      href: '/nations'
    }
  ];

  const loggedInLeft: NavItem[] = [
    {
      type: 'dropdown',
      title: (user || {}).display_name,
      items: [
        {
          type: 'page',
          icon: User,
          title: 'Profile',
          href: `/u/${(user || {}).username}`
        },
        {
          type: 'page',
          icon: Settings,
          title: 'Settings',
          href: '/settings'
        },
        { type: 'separator' },
        {
          type: 'page',
          icon: LayoutDashboard,
          title: 'Admin',
          href: '/admin'
        },
        { type: 'separator' },
        {
          type: 'action',
          icon: LogOut,
          title: 'Logout',
          onClick: () => {
            logout();
          }
        }
      ]
    }
  ];
  const loggedOutLeft: NavItem[] = [
    {
      type: 'page',
      icon: LogIn,
      title: 'Login',
      href: discordUrl
    }
  ];

  return (
    <nav className={styles.navBar}>
      <div className={styles.container}>
        <ul>
          {leftNavItems.map((item: NavItem, i: number) =>
            renderNavItem(item, i, path)
          )}
        </ul>
        {user ? (
          <ul>
            {loggedInLeft.map((item: NavItem, i: number) =>
              renderNavItem(item, i, path)
            )}
          </ul>
        ) : (
          <ul>
            {loggedOutLeft.map((item: NavItem, i: number) =>
              renderNavItem(item, i, path)
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
