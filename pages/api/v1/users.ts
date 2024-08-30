import Database from '@/lib/Database';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Response {
  id: number;
  did: string;
  username: string;
  global_name: string;
  avatar?: string;
  banner?: string;
  accent_color?: number;
  permissions: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response[]>,
) {
  const db = new Database();

  const users = await db.getUsers();

  res.status(200).json(users);
}
