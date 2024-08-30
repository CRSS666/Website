import Database from '@/lib/Database';
import { hasPermission, Permission } from './permissions';

const db  = new Database();

interface doas {
  user?: any;
  hasPermission: boolean;
}

export async function isUserAdmin(sid?: string): Promise<doas> {
  if (!sid)
    return { hasPermission: false };

  const session = await db.getSession(sid!);

  if (!session)
    return { hasPermission: false };

  const user = await db.getUser(session.uid);

  if (!user)
    return { hasPermission: false };

  return {
    user,
    hasPermission: hasPermission(user.permissions, Permission.Admin)
  };
}