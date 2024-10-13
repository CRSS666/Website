import Database from '@/lib/Database';
import Discord from '@/lib/Discord';
import S3Storage from '@/lib/Storage';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const db = new Database();
  const s3 = new S3Storage();

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
    const token = await db.newSession(json, req.headers['user-agent']!, (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress!));

    if (!token) {
      return res.status(500).json({
        code: 500,
        message: 'Internal Server Error'
      });
    }

    res.redirect(302, state);
    res.json({
      token
    });

    try {
      const dc     = new Discord(json.access_token);
      const dcUser = await dc.user();

      const user = await db.getUser((await db.getSession(token)).user_id);

      if (dcUser.data.avatar) {
        const fetchData = await fetch(`https://cdn.discordapp.com/avatars/${dcUser.data.id}/${dcUser.data.avatar}.png?size=1024`);
        const buffer    = await fetchData.arrayBuffer();

        await s3.uploadFile(`users/${user?.id}/avatar/${dcUser.data.avatar}.png`, Buffer.from(buffer), 'image/png');
      }

      if (dcUser.data.banner) {
        const fetchData = await fetch(`https://cdn.discordapp.com/banners/${dcUser.data.id}/${dcUser.data.banner}.png?size=1024`);
        const buffer    = await fetchData.arrayBuffer();

        await s3.uploadFile(`users/${user?.id}/banner/${dcUser.data.banner}.png`, Buffer.from(buffer), 'image/png');
      }
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}