import { TeamMember, User } from '@/interfaces';
import { getBadges } from '@/utils/badges';
import { getPermissions } from '@/utils/permissions';
import mysql, { Pool, QueryResult } from 'mysql2/promise';

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
  async getUser(id: BigInt): Promise<User> {
    const [ rows ] = await this.mysqlPool!.query('SELECT * FROM users WHERE id = ?', [ id ]);

    if((rows as any[]).length === 0)
      throw new Error('User Not Found');

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

      permissions: getPermissions(row.permissions),
      badges: getBadges(row.badges),

      createdAt: row.created_at,
      updatedAt: row.updated_at
    } as User;
  }

  // Meta -----------

  async getTeam(): Promise<TeamMember[]> {
    const [ rows ] = await this.mysqlPool!.query('SELECT * FROM team');
    
    const usersPromises = (rows as any[]).map(row => this.getUser(row.user_id));
    const users = await Promise.all(usersPromises);

    return users.map((user, i) => ({
      role: (rows as any[])[i].role,
      ...user,
    } as TeamMember));
  }
}

export default Database;