import { X } from 'lucide-react';

export interface BaseNavItem {
  icon?: typeof X;
  title: string;
  type: 'dropdown' | 'page' | 'action';
}

export interface DropdownNavItem extends BaseNavItem {
  type: 'dropdown';
  items: NavItem[];
}

export interface PageNavItem extends BaseNavItem {
  type: 'page';
  href: string;
}

export interface ActionNavItem extends BaseNavItem {
  type: 'action';
  onClick: (e: React.MouseEvent) => void | Promise<void>;
}

export interface SeparatorNavItem {
  type: 'separator';
}

export type NavItem =
  | DropdownNavItem
  | PageNavItem
  | ActionNavItem
  | SeparatorNavItem;
