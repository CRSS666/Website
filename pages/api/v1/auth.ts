import Database from '@/lib/Database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const db = new Database();

  const { code, state } = req.query;

  if (typeof code !== 'string' || typeof state !== 'string') {
    return res.status(400).json({
      code: 400,
      message: 'Invalid Request'
    });
  }

  try {
    const data = await fetch(`${process.env.DISCORD_API}/oauth2/token`, {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT!,
        client_secret: process.env.DISCORD_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT!,
      }),
    });
  
    const json  = await data.json();
    const token = await db.newSession(json, req.headers['user-agent']!, req.socket.remoteAddress!);

    if (!token) {
      return res.status(500).json({
        code: 500,
        message: 'Internal Server Error'
      });
    }

    res.status(200).json({
      token
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}