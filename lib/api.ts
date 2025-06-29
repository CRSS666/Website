import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { Connection, User } from './types/database';
import Badges from './types/badges';

class Api {
  private async fetch(url: string, settings?: RequestInit) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL!}${url}`, {
      ...settings,
      headers: {
        Authorization: `Bearer ${await this.getSessionToken()}`,
        'User-Agent': 'CRSSWebsite/4.0.0 (https://crss.cc)',
        'X-RateLimit-BypassKey': process.env.RATELIMIT_BYPASS_KEY!
      }
    });
  }

  public hasSessionCookie = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;

    if (!cookie) return false;
    else return true;
  });

  public getSessionToken = cache(async () => {
    if (!(await this.hasSessionCookie())) return null;
    return (await cookies()).get('session')?.value;
  });

  public getUser = cache(async (): Promise<User | null> => {
    if (!(await this.hasSessionCookie())) return null;

    try {
      const user = await this.fetch('/v1/user/@me');
      if (!user.ok) return null;
      return await user.json();
    } catch {
      return null;
    }
  });

  public getUserFromUsername = cache(
    async (username: string): Promise<User | null> => {
      try {
        const user = await this.fetch('/v1/user/' + username);
        if (!user.ok) return null;
        const json = await user.json();
        return {
          id: json.id,
          discord_id: json.discord_id,
          minecraft_id: json.minecraft_id,
          username: json.username,
          display_name: json.display_name,
          email: json.email,
          pronouns: json.pronouns,
          avatar: json.avatar,
          banner: json.banner,
          accent_color: json.accent_color,
          role: json.role,
          badges: (() => {
            const result: string[] = [];
            const named = [
              ['hello_world', Badges.HelloWorld],
              ['community', Badges.Community],
              ['dedicated_builder', Badges.DedicatedBuilder],
              ['placeholder3', Badges.Placeholder3],
              ['placeholder4', Badges.Placeholder4],
              ['placeholder5', Badges.Placeholder5],
              ['placeholder6', Badges.Placeholder6],
              ['placeholder7', Badges.Placeholder7],
              ['placeholder8', Badges.Placeholder8],
              ['placeholder9', Badges.Placeholder9],
              ['code_contributor', Badges.CodeContributor],
              ['placeholder11', Badges.Placeholder11],
              ['placeholder12', Badges.Placeholder12],
              ['placeholder13', Badges.Placeholder13],
              ['placeholder14', Badges.Placeholder14],
              ['placeholder15', Badges.Placeholder15],
              ['placeholder16', Badges.Placeholder16],
              ['placeholder17', Badges.Placeholder17],
              ['placeholder18', Badges.Placeholder18],
              ['placeholder19', Badges.Placeholder19],
              ['placeholder20', Badges.Placeholder20],

              ['nothing_to_see', Badges.NothingToSee]
            ] as const;

            for (const [name, value] of named) {
              const bit = BigInt(value);
              if ((BigInt(json.badges) & bit) !== 0n) {
                result.push(name); // or push value if you prefer the enum number
              }
            }

            return result;
          })(),
          created: json.created,
          updated: json.updated
        };
      } catch (e: any) {
        console.error(e);
        return null;
      }
    }
  );

  public deleteSession = cache(async () => {
    if (!(await this.hasSessionCookie())) return false;

    try {
      const del = await this.fetch('/v1/session', { method: 'DELETE' });
      if (!del.ok) return false;
      (await cookies()).delete('session');
      return true;
    } catch {
      return false;
    }
  });

  public getUserConnectionsFromUsername = cache(
    async (username: string): Promise<Omit<Connection, 'user_id'>[] | null> => {
      try {
        const connections = await this.fetch(`/v1/user/${username}/connection`);
        if (!connections.ok) return null;
        return await connections.json();
      } catch {
        return null;
      }
    }
  );
}

const api = new Api();

export default api;
