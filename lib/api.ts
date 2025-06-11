import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { User } from './types/database';

class Api {
  private async fetch(url: string, settings?: RequestInit) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL!}${url}`, {
      ...settings,
      headers: {
        Authorization: `Bearer ${await this.getSessionToken()}`,
        'User-Agent': 'CRSSWebsite/4.0.0 (https://crss.cc)'
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
        return await user.json();
      } catch {
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
}

const api = new Api();

export default api;
