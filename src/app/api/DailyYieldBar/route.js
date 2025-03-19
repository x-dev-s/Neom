import { fetchDailyYieldData } from "../../server";

export async function GET() {
    try {
      const data = await fetchDailyYieldData();
      return data;
    } catch (error) {
      return Response.json(
        { message: 'Error fetching data', error: error.message },
        { status: 500 }
      );
    }
  }