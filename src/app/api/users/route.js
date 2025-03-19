// app/api/data/route.js
import { fetchAllUsers } from '@/app/server';
export async function GET() {
  try {
    const response = await fetchAllUsers();
    return response;
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