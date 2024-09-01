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
}

export default Database;