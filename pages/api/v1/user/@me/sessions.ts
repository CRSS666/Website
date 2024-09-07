import { ErrorResponse, User } from '@/interfaces';
import Database from '@/lib/Database';
import { getAuthenticatedUser } from '@/utils/auth_util';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>, // User | ErrorResponse
) {
  const db   = new Database();
  const user = await getAuthenticatedUser(req);

  if (!user)
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });

  if (req.method === 'GET') {
    const sessions = await db.getSessions(user.id);

    return res.status(200).json(
      sessions.map((session) => ({
        id: session.id,

        ip: session.ip,
        userAgent: session.user_agent,

        createdAt: session.created_at,
        expiresAt: session.expires_at,
      }))
    );
  }

  return res.status(405).json({
    code: 405,
    message: 'Method Not Allowed'
  });
}