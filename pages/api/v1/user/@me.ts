import { ErrorResponse, User } from '@/interfaces';
import Database from '@/lib/Database';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>,
) {
  const db = new Database();

  const { authorization } = req.headers;

  const token = authorization?.split(' ')!;

  if (!token)
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });

  if (token[0] !== 'Bearer' || !token[1])
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });

  const session = await db.getSession(token[1]);
  
  if (!session)
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });

  const user = await db.getUser(session.user_id);

  if (!user)
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized'
    });

  res.status(200).json(user);
}