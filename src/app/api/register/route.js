import { connectToDatabase } from "../../../lib/db";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email, password } = await request.json()

    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM User'); // Replace with your table name
    const response = Response.json(rows);
    const Users = await response.json()
    const existingUser = Users.find(
      (user) => user.email === email
    );

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 5)

  try {
    await connection.execute(
      `INSERT INTO User (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    )
    return new NextResponse("user is registered", { status: 200 })
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    })
  }
}
