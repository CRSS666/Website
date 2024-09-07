import Database from '@/lib/Database';
import { getPermission, hasPermission, Permission } from './permissions';
import { User } from '@/interfaces';

import type { NextApiRequest } from 'next';

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
    hasPermission: hasPermission(getPermission(user.permissions), Permission.Admin)
  };
}

export async function getAuthenticatedUser(req: NextApiRequest): Promise<User | undefined> {
  const { authorization } = req.headers;

  const token = authorization?.split(' ')!;

  if (!token)
    return undefined;

  if (token[0] !== 'Bearer' || !token[1])
    return undefined;

  const session = await db.getSession(token[1]);
  
  if (!session)
    return undefined;

  const user = await db.getUser(session.user_id);

  if (!user)
    return undefined;

  return user;
}

export async function reqHasValidToken(req: NextApiRequest): Promise<boolean> {
  const { authorization } = req.headers;

  const token = authorization?.split(' ')!;

  if (!token)
    return false;

  if (token[0] !== 'Bearer' || !token[1])
    return false;

  const session = await db.getSession(token[1]);

  if (!session)
    return false;

  return true;
}