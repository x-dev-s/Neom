// db.js
import mysql from 'mysql2/promise';

const config = {
  host: 'auth-db843.hstgr.io', // Replace with your database hostname
  user: 'u763093171_PowerMatix', // Replace with your database username
  password: 'Power@2567', // Replace with your database password
  database: 'u763093171_NEOM', // Replace with your database name
  port: 3306, // Default MySQL port
};

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Connected to MySQL');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
}