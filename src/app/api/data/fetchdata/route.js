// app/api/data/route.js
import { connectToDatabase } from "../../../../lib/db";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM All_Data'); // Replace with your table name
    return Response.json(rows);
  } catch (error) {
    return Response.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  return Response.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return Response.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return Response.json({ message: 'Method not allowed' }, { status: 405 });
}