import Database from '@/lib/Database';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  discord_id: string;
  names: {
    username: string;
    global_name: string;
  };
  email: string;
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
  const sid = req.cookies.session;

  if (!sid)
    return res.status(401).json({ error: 'Unauthorized' });

  const session = await db.getSession(sid!);

  if (!session)
    return res.status(401).json({ error: 'Unauthorized' });

  const user = await db.getUser(session.uid);

  res.status(200).json({
    id: user.id,
    discord_id: user.did,
    names: {
      username: user.username,
      global_name: user.global_name
    },
    email: user.email,
    avatar: user.avatar,
    banner: user.banner,
    accent_color: user.accent_color,
    permissions: user.permissions
  });
}
