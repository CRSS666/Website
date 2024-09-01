import crypto from 'node:crypto';

import snowflake from './snowflake';

import Discord from '@/lib/Discord';

interface DiscordTokenData {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
};

/**
 * Creates a session token.
 * 
 * @param oauthData The data returned from the `/oauth2/token` endpoint.
 * 
 * @returns The session token.
 */
export async function createSessionToken(oauthData: DiscordTokenData): Promise<string> {
  const discord = new Discord(oauthData.access_token);
  const res     = await discord.user();

  if (!res.ok)
    throw new Error('Failed to fetch user data from Discord.');

  const dcUser = res.data;

  const hmac = crypto
    .createHmac('sha256', process.env.AUTH_SECRET!)
    .update(dcUser.access_token)
    .digest('hex');

  const tuid = Buffer
    .from(dcUser.id)
    .toString('base64')
    .replaceAll('=', '');

  const tdid = Buffer
    .from(
      snowflake
        .getUniqueID()
        .toString()
    )
    .toString('base64')
    .replaceAll('=', '');

  return `${tuid}.${tdid}.${hmac}`;
}