import Database from '@/lib/Database';
import { serialize } from 'cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  sid: string | null;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>,
) {
  const db = new Database();

  const { code, state } = req.query;

  console.log(code, state);

  const discordApi = process.env.DISCORD_API!;

  try {
    if (typeof code === 'string') {
      const data = await fetch(`${discordApi}/oauth2/token`, {
        method: 'POST',
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT!,
          client_secret: process.env.DISCORD_SECRET!,
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.DISCORD_REDIRECT!,
        }),
      });
  
      const json = await data.json();
      const sid  = await db.createSession(json, req.headers['user-agent']);
  
      if (sid) {
        const cookie = serialize('session', sid, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          expires: new Date(Date.now() + json.expires_in * 1000),
        });
  
        res.setHeader('Set-Cookie', cookie);
        
        if ((state as string).startsWith('/'))
          res.status(302).redirect(state as string);
        else 
          res.status(400).json({ error: 'Invalid redirect uri in state!' });
      }
  
      return;
    }
  } catch (error) {
    console.error(error);

    res.status(500).json(
      { error: 'Internal Server Error' }
    );
  }

  res.status(400).json(
    { error: 'Invalid code' }
  );
}