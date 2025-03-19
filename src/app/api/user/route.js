import { fetchAllUsers } from '@/app/server';
import { verifyJwtToken } from "@/utils/auth";
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export async function GET(request) {
    try {
        let token = request.url.split('?')[1];
        if (!token) {
            return new NextResponse("User not logged in", { status: 401 });
        }
        token = token.split('=')[1];
        const tokendata = token && (await verifyJwtToken(token));
        if (!tokendata) {
            return new NextResponse("Invalid Token", { status: 400 });
        }
        const response = await fetchAllUsers();
        const Users = await response.json();
        const user = await Users.find(
            (user) => user.ID == tokendata.user.id
        );
        if (user) {
            delete user.Password;
            return new NextResponse(JSON.stringify(user), { status: 200 });
        }
        else {
            return new NextResponse("Unknown User", { status: 400 });
        }
    } catch (err) {
        throw new Error(err);
    }

}