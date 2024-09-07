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

  const { id } = req.query;

  if (!user)
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });

  if (req.method === 'DELETE') {
    const didDelete = await db.deleteSession(id as string);

    if (!didDelete)
      return res.status(404).json({
        code: 404,
        message: 'Session Not Found'
      });

    return res.status(204).end();
  }

  return res.status(405).json({
    code: 405,
    message: 'Method Not Allowed'
  });
}