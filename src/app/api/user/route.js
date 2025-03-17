import { connectToDatabase } from "../../../lib/db";
import { verifyJwtToken } from "@/utils/auth";
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export async function GET(request) {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM User'); // Replace with your table name
        const Users = Response.json(rows);
        let token = request.url.split('?')[1];
        if (!token) {
            return new NextResponse("User not logged in", { status: 401 });
        }
        token = token.split('=')[1];
        const tokendata = token && (await verifyJwtToken(token));
        if (!tokendata) {
            return new NextResponse("Invalid Token", { status: 400 });
        }
        const user = await Users.filter((user) => user.email === tokendata.user.email);
        if (user) {
            return new NextResponse(JSON.stringify(tokendata.user), { status: 200 });
        }
        else {
            return new NextResponse("Unknown User", { status: 400 });
        }
    } catch (err) {
        throw new Error(err);
    }

}