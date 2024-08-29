import Database from '@/lib/Database';
import type { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';

type Data = {
  success: string;
};

interface Error {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>,
) {
  const db  = new Database();
  const sid = req.cookies.session;

  if (!sid)
    return res.status(401).json({ error: 'Unauthorized' });

  const session = await db.getSession(sid!);

  if (!session)
    return res.status(401).json({ error: 'Unauthorized' });

  const user = await db.getUser(session.uid);

  if (!user)
    return res.status(404).json({ error: 'Not Found' });

  if (req.method === 'DELETE') {
    db.deleteSession(sid!);

    res.setHeader('Set-Cookie', serialize('session', '', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    }));

    return res.status(200).json({ success: 'Delete Session for ' + user.username });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}