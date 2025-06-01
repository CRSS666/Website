import { ChevronDown, ChevronUp } from 'lucide-react';

import { renderNavItem } from '@/components/NavItemRenderer';

import { usePathname } from 'next/navigation';

import type { NavItem } from '@/lib/types/navitems';

import styles from '@/styles/components/Dropdown.module.scss';

interface DropdownProps {
  icon?: typeof ChevronDown;
  title: string;
  items: NavItem[];
}

export default function Dropdown({ icon: Icon, title, items }: DropdownProps) {
  const path = usePathname();

  return (
    <div className={styles.dropDown}>
      {Icon && <Icon />}

      <span>{title}</span>

      <ChevronDown data-action="open" />
      <ChevronUp data-action="close" />

      <ul>
        {items.map((item: NavItem, i: number) => renderNavItem(item, i, path))}
      </ul>
    </div>
  );
}
