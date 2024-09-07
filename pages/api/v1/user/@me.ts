import { ErrorResponse, User } from '@/interfaces';
import Database from '@/lib/Database';
import { getAuthenticatedUser } from '@/utils/auth_util';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>,
) {
  const db   = new Database();
  const user = await getAuthenticatedUser(req);

  if (!user)
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });

  if (req.method === 'GET') {
    return res.status(200).json(user);
  }

  if (req.method === 'PATCH') {
    // TODO: implement

    return res.status(501).json({
      code: 501,
      message: 'Not Yet Implemented'
    });
  }

  if (req.method === 'DELETE') {
    // TODO: implement

    return res.status(501).json({
      code: 501,
      message: 'Not Yet Implemented'
    });
  }

  return res.status(405).json({
    code: 405,
    message: 'Method Not Allowed'
  });
}