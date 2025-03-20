// app/api/data/route.js
import { fetchAllUsers } from '../../../server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetchAllUsers();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching users', error: error.message },
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