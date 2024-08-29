import { Role } from '@/utils/permissions';
import mysql, { Pool, QueryResult } from 'mysql2/promise';

import crypto from 'node:crypto';

interface DiscordTokenData {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface UserTable {
  id: number;
  did: string;
  username: string;
  global_name: string;
  email: string;
  avatar: string;
  banner: string;
  accent_color: number;
  permissions: number;
}

interface TeamMember {
  id: number;
  uid: number;
  did: string;
  username: string;
  global_name: string;
  email: string;
  avatar: string;
  banner: string;
  accent_color: number;
  permissions: number;
  role: Role;
}

class Database {
  static instance: (Database | null) = null;

  mysqlPool: (Pool | null) = null;

  constructor() {
    if(Database.instance)
      return Database.instance;

    this.mysqlPool = mysql.createPool({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      waitForConnections: true,
      supportBigNumbers: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    Database.instance = this;
  }

  // Auth Stuff

  async createUser(user: any): Promise<number> {
    const [ result ] = await this.mysqlPool!.execute('SELECT * FROM users WHERE did = ?', [ user.id ]);

    if ((result as any).length > 0) {
      return (result as any)[0].id;
    }

    const [ res ] = await this.mysqlPool!.execute('INSERT INTO users (did, username, global_name, email, avatar, banner, accent_color) VALUES (?, ?, ?, ?, ?, ?, ?)', [ 
      user.id,
      user.username,
      user.global_name,
      user.email,
      user.avatar,
      user.banner,
      user.accent_color
    ]);

    return (res as any).insertId;
  }

  /**
   * Creates a session for the user.
   * 
   * Should only be called by backend!
   * 
   * @param userData The data returned from the `/oauth2/token` endpoint.
   * @param userAgent The user agent of the user.
   * 
   * @returns `string` The session token.
   */
  async createSession(userData: DiscordTokenData, userAgent?: string): Promise<string | null> {
    const res = await fetch(`${process.env.DISCORD_API}/users/@me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userData.access_token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      const uid  = await this.createUser(user);

      const sum  = crypto.createHmac('sha256', process.env.AUTH_SECRET!);
      const base = Buffer.from(user.id).toString('base64');

      sum.update(userData.access_token);

      const sid = base + '.' + sum.digest('hex');

      const [ result ] = await this.mysqlPool!.execute('INSERT INTO sessions (sid, uid, access_token, refresh_token, id_token, user_agent, expires) VALUES (?, ?, ?, ?, ?, ?, ?)', [ 
        sid,
        uid,
        userData.access_token,
        userData.refresh_token,
        userData.id_token,
        userAgent,
        new Date(Date.now() + (userData.expires_in * 1000)),
      ]);

      return sid;
    } else {
      throw new Error('Error Fetching Discord User Data');
    }
  }

  async getSession(sid: string): Promise<any> {
    const [ rows ] = await this.mysqlPool!.execute('SELECT * FROM sessions WHERE sid = ?', [ sid ]);

    return (rows as any)[0];
  }

  // End of Auth Stuff

  async getUser(id: number): Promise<UserTable> {
    const [ rows ] = await this.mysqlPool!.execute('SELECT * FROM users WHERE id = ?', [ id ]);

    return (rows as UserTable[])[0];
  }

  async getUserUsername(username: string): Promise<UserTable> {
    const [ rows ] = await this.mysqlPool!.execute('SELECT * FROM users WHERE username = ?', [ username ]);

    return (rows as UserTable[])[0];
  }

  async getUserSessions(uid: number): Promise<any> {
    const [ rows ] = await this.mysqlPool!.execute('SELECT * FROM sessions WHERE uid = ?', [ uid ]);

    return rows;
  }

  async getTeam(): Promise<TeamMember[]> {
    const [ rows ] = await this.mysqlPool!.execute('SELECT team_members.id AS tid, team_members.uid AS uid, users.did, users.username, users.global_name, users.email, users.avatar, users.banner, users.accent_color, users.permissions, team_members.role FROM team_members JOIN users ON team_members.uid = users.id;');
  
    return (rows as any).map((row: any) => {
      return {
        id: row.tid,
        uid: row.uid,
        did: row.did,
        username: row.username,
        global_name: row.global_name,
        email: row.email,
        avatar: row.avatar,
        banner: row.banner,
        accent_color: row.accent_color,
        permissions: row.permissions,
        role: (row.role as Role),
      };
    });
  }
}

export default Database;