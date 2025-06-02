'use client';

import Link from 'next/link';

import type { NavItem } from '@/lib/types/navitems';
import Dropdown from '@/components/Dropdown';

export const renderNavItem = (
  item: NavItem,
  i: number,
  path: string,
  onNavigate?: (e: any) => void
) => {
  switch (item.type) {
    case 'page':
      return (
        <li key={i}>
          <Link
            href={item.href === path ? '#' : item.href}
            onNavigate={onNavigate}
            data-active={item.href === path}
          >
            {item.icon && <item.icon />}

            <span>{item.title}</span>
          </Link>
        </li>
      );
    case 'dropdown':
      return (
        <li key={i}>
          <Dropdown icon={item.icon} title={item.title} items={item.items} />
        </li>
      );
    case 'action':
      return (
        <li key={i}>
          <button onClick={item.onClick}>
            {item.icon && <item.icon />}

            <span>{item.title}</span>
          </button>
        </li>
      );
    case 'separator':
      return (
        <div
          key={i}
          style={{
            borderBottom: '1px solid var(--outlineVariant)',
            width: '100%',
            margin: '2px 0'
          }}
        />
      );
  }
};
