import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  res
    .status(200)
    .json({
      latest: 0,
      versions: [
        {
          version: {
            name: 'v1.0.0',
            code: 1,
          },
          path: '/v1',
          deprecated: false,
        }
      ]
    });
}