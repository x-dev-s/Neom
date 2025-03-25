import { fetchSldData } from "@/app/server";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const data = await fetchSldData();
    return Response.json(await data.json());
  } catch (error) {
    return Response.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}