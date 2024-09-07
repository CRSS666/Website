import { ErrorResponse, User } from '@/interfaces';

import Database from '@/lib/Database';
import { getAuthenticatedUser, reqHasValidToken } from '@/utils/auth_util';
import { getPermission, hasPermission, Permission, PermissionNamed } from '@/utils/permissions';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>,
) {
  const db = new Database();

  const { id } = req.query;

  let shouldShowSensitive = false;

  // tf was I on?
  // const valid = await reqHasValidToken(req);

  // thats better
  const vUser = await getAuthenticatedUser(req);

  if (!vUser)
    shouldShowSensitive = false;

  if (
    hasPermission(getPermission(vUser!.permissions), Permission.SuperAdmin) ||
    vUser!.id === BigInt(id as string)
  )
    shouldShowSensitive = true;

  if ((/^\d+$/).test(id as string)) {
    let user = await db.getUser((id as string));

    if (!user)
      return res.status(404).json({
        code: 404,
        message: 'User Not Found'
      });

    user = {
      ...user,

      email: shouldShowSensitive ? user.email : undefined,
      discordId: shouldShowSensitive ? user.discordId : undefined,
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

      email: shouldShowSensitive ? user.email : undefined,
      discordId: shouldShowSensitive ? user.discordId : undefined,
    };

    res.status(200).json(user);
  }
}