import { connectToDatabase } from "../../../lib/db";
import bcrypt from "bcryptjs"
import { NextResponse } from 'next/server';
import { login } from "../../../../lib";
import { cookies } from "next/headers";

export async function POST(request) {
  const credentials = await request.json();
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM User'); // Replace with your table name
    const response = Response.json(rows);
    const Users = await response.json()
    const user = Users.find(
      (user) => user.Email === credentials.email
    );
    
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.Password
      );
      if (isPasswordCorrect) {
        const {session, expires} = await login({ email: credentials.email, name: user.Name.replace(/\s/g, ''), id: user.ID });
        cookies().set("session", session, { expires })
        return new NextResponse("Login Successful", { status: 200 });
      }
      else {
        return new NextResponse("Password is incorrect", { status: 400 });
      }
    }
    else {
      return new NextResponse("This email is not registered", { status: 400 });
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }

}