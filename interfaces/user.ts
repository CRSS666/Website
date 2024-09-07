import { BadgeNamed } from '@/utils/badges';
import { PermissionNamed } from '@/utils/permissions';

export interface User {
  id: BigInt;

  username: string;
  displayName: string;

  email?: string;

  avatar?: string;
  banner?: string;

  accentColor?: number;

  discordId?: BigInt;

  subscription: number;

  permissions: PermissionNamed[];
  badges: BadgeNamed[];

  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember extends User {
  role: string;
}