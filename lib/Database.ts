import { TeamMember, User } from '@/interfaces';
import { getBadges } from '@/utils/badges';
import { getPermissions } from '@/utils/permissions';
import mysql, { Pool, QueryResult } from 'mysql2/promise';
import Discord from './Discord';
import { createSessionToken, DiscordTokenData } from '@/utils/token_util';
import snowflake from '@/utils/snowflake';

class Database {
  static  instance:  (Database | null) = null;
  private mysqlPool: (Pool | null)     = null;

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

  /**
   * Get a user from their id.
   * 
   * @param id User's id
   * 
   * @returns User
   */
  async getUser(id: string): Promise<User | undefined> {
    const [ rows ] = await this.mysqlPool!.query('SELECT * FROM users WHERE id = ?', [ id ]);

    if((rows as any[]).length === 0)
      return undefined;

    const row = (rows as any[])[0];

    return {
      id: row.id as BigInt,

      username: row.username,
      displayName: row.display_name,

      email: row.email,

      avatar: row.avatar,
      banner: row.banner,

      accentColor: row.accent_color,

      discordId: row.discord_id as BigInt,

      subscription: row.subscription,

      permissions: getPermissions(row.permissions),
      badges: getBadges(row.badges),

      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as User;
  }

  /**
   * Get a user from their username.
   * 
   * @param username User's username
   * 
   * @returns User
   */
  async getUserUsername(username: string): Promise<User | undefined> {
    const [ rows ] = await this.mysqlPool!.query('SELECT * FROM users WHERE username = ?', [ username ]);

    if((rows as any[]).length === 0)
      return undefined;

    const row = (rows as any[])[0];

    return {
      id: row.id as BigInt,

      username: row.username,
      displayName: row.display_name,

      email: row.email,

      avatar: row.avatar,
      banner: row.banner,

      accentColor: row.accent_color,

      discordId: row.discord_id as BigInt,

      subscription: row.subscription,

      permissions: getPermissions(row.permissions),
      badges: getBadges(row.badges),

      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as User;
  }

  private async getUserDiscord(discordId: BigInt): Promise<User | undefined> {
    const [ rows ] = await this.mysqlPool!.query('SELECT * FROM users WHERE discord_id = ?', [ discordId ]);

    if((rows as any[]).length === 0)
      return undefined;

    const row = (rows as any[])[0];

    return {
      id: row.id as BigInt,

      username: row.username,
      displayName: row.display_name,

      email: row.email,

      avatar: row.avatar,
      banner: row.banner,

      accentColor: row.accent_color,

      discordId: row.discord_id as BigInt,

      subscription: row.subscription,

      permissions: getPermissions(row.permissions),
      badges: getBadges(row.badges),

      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as User;
  }

  async newUser(user: any): Promise<User> {
    const userExists = await this.getUserDiscord(user.id);

    if(userExists)
      return userExists;

    const id = snowflake.getUniqueID();

    await this.mysqlPool!.query('INSERT INTO users (id, username, display_name, email, avatar, banner, accent_color, discord_id, permissions, badges) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      id.toString(),

      user.username,
      user.global_name,
      user.email,
      user.avatar,
      user.banner,
      user.accent_color,
      user.id
    ]);

    return {
      id: id,

      username: user.username,
      displayName: user.display_name,

      email: user.email,

      avatar: user.avatar,
      banner: user.banner,

      accentColor: user.accent_color,

      discordId: user.discord as BigInt,

      subscription: user.subscription,

      permissions: getPermissions(user.permissions),
      badges: getBadges(user.badges),

      createdAt: new Date(),
      updatedAt: new Date()
    } as User;
  }

  // Session -------------

  /**
   * Create a new session.
   * 
   * @param oauthData The data returned from the `/oauth2/token` endpoint.
   * @param userAgent Request's User-Agent
   * @param ip Request's IP
   * 
   * @returns 
   */
  async newSession(oauthData: DiscordTokenData, userAgent: string, ip: string): Promise<string | undefined> {
    const discord = new Discord(oauthData.access_token);

    const dcUser = await discord.user();
    const token  = await createSessionToken(oauthData);

    if(!dcUser.ok || !token)
      return undefined;

    const user = await this.newUser(dcUser.data);

    if(!user)
      return undefined;

    try {
      await this.mysqlPool!.query('INSERT INTO user_sessions (token, user_id, dc_access_token,	dc_refresh_token,	dc_id_token, user_agent, ip, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
        token,
        user.id,
        oauthData.access_token,
        oauthData.refresh_token,
        oauthData.id_token,
        userAgent,
        ip,
        new Date(Date.now() + (oauthData.expires_in * 1000))
      ]);
    } catch (e) {
      console.error(e);

      return undefined;
    }

    return token;
  }

  async getSession(token: string): Promise<any | undefined> {
    const [ rows ] = await this.mysqlPool!.query('SELECT * FROM user_sessions WHERE token = ?', [ token ]);

    if((rows as any[]).length === 0)
      return undefined;

    const row = (rows as any[])[0];

    if(new Date(row.expires_at) < new Date())
      return undefined;

    return row;
  }

  // Meta ----------------

  async getTeam(): Promise<(TeamMember | undefined)[]> {
    const [ rows ] = await this.mysqlPool!.query('SELECT * FROM team');
    
    const usersPromises = (rows as any[]).map(row => this.getUser(row.user_id));
    const users = await Promise.all(usersPromises);

    return users.map((user, i) => {
      if (!user) return undefined;

      return {
        ...user,
        role: (rows as any[])[i].role
      } as TeamMember;
    });
  }
}

export default Database;