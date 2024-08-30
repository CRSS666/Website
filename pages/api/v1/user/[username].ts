import Database from '@/lib/Database';
import { isUserAdmin } from '@/utils/auth_util';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  discord_id: string;
  names: {
    username: string;
    global_name: string;
  };
  avatar?: string;
  banner?: string;
  accent_color?: number;
  permissions: number;
};

interface Error {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>,
) {
  const db = new Database();

  const user = await db.getUserUsername(req.query.username as string);

  if (!user) {
    return res.status(404).json({ error: 'Not Found' });
  }

  // hehe only admins update users :trolley:
  // also validation yeah uh... didn't have budget for that
  // tech debt for the win
  if (req.method === 'PATCH') {
    const sid = req.cookies.session;

    const isAdmin = isUserAdmin(sid);

    if (!isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { permissions } = req.body;

    if (permissions) {
      await db.updateUserPermissions(user.id, permissions);
    }

    res.status(204).end();

    return;
  }

  res.status(200).json({
    id: user.id,
    discord_id: user.did,
    names: {
      username: user.username,
      global_name: user.global_name
    },
    avatar: user.avatar,
    banner: user.banner,
    accent_color: user.accent_color,
    permissions: user.permissions
  });
}
