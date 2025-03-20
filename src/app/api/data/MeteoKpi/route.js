import { fetchMeteoKpiData } from "../../../server";

export async function GET() {
  try {
    const data = await fetchMeteoKpiData();
    return Response.json(await data.json());
  } catch (error) {
    return Response.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}