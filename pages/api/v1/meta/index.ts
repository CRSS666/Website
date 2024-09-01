import getConfig from 'next/config';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { publicRuntimeConfig } = getConfig();

  let { git } = publicRuntimeConfig;

  git.commit.created = new Date(git.commit.created).getTime();

  res
    .status(200)
    .json({
      git,
    });
}