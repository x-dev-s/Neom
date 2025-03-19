// db.js
import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(config);
    await connection.query("SET time_zone = '+03:00'");
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
}