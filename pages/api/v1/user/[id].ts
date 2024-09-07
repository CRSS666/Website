import { ErrorResponse, User } from '@/interfaces';

import Database from '@/lib/Database';
import { reqHasValidToken } from '@/utils/auth_util';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>,
) {
  const db = new Database();

  const { id } = req.query;

  const valid = await reqHasValidToken(req);

  if ((/^\d+$/).test(id as string)) {
    let user = await db.getUser((id as string));

    if (!user)
      return res.status(404).json({
        code: 404,
        message: 'User Not Found'
      });

    // TODO: check if user is admin or itself and show email and discordId
    user = {
      ...user,

      email: valid ? user.email : undefined,
      discordId: valid ? user.discordId : undefined,
    };

    res.status(200).json(user);
  } else {
    let user: any = await db.getUserUsername(id as string);

    if (!user)
      return res.status(404).json({
        code: 404,
        message: 'User Not Found'
      });
  

    // TODO: check if user is admin or itself and show email and discordId
    user = {
      ...user,

      email: valid ? user.email : undefined,
      discordId: valid ? user.discordId : undefined,
    };

    res.status(200).json(user);
  }
}