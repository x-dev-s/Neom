'use server';
import { connectToDatabase } from "../lib/db";

export async function fetchAllData (){
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM All_Data'); // Replace with your table name
        return Response.json(rows);
      } catch (error) {
        return null;
      }
}
export async function fetchGensetData (){
    try {
        const connection = await connectToDatabase();
        const [generator1] = await connection.execute(
            `SELECT Timestamp, TotalActivePower_G1, TotalReactivePower_G1 FROM All_Data WHERE  Timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) ORDER BY Timestamp DESC`
        );
        const [generator2] = await connection.execute(
          `SELECT Timestamp, TotalActivePower_G2, TotalReactivePower_G2 FROM All_Data WHERE  Timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) ORDER BY Timestamp DESC`
        );
        const [generator3] = await connection.execute(
          `SELECT Timestamp, TotalActivePower_G3, TotalReactivePower_G3 FROM All_Data WHERE  Timestamp >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) ORDER BY Timestamp DESC`
        );
        return Response.json({
          generator1,
          generator2,
          generator3,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        return Response.json(
          { message: 'Error fetching data', error: error.message },
          { status: 500 }
        );
      }
}