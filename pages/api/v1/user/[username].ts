import Database from '@/lib/Database';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  discord_id: string;
  names: {
    username: string;
    global_name: string;
  };
  avatar: string;
  banner: string;
  accent_color: number;
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
