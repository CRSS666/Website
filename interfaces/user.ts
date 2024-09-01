import { Badge } from '@/utils/badges';
import { Permission } from '@/utils/permissions';

export interface User {
  id: BigInt;

  username: string;
  displayName: string;

  email?: string;

  avatar?: string;
  banner?: string;

  accentColor?: number;

  permissions: Permission[];
  badges: Badge[];
}