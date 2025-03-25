import { fetchPvPowerTrendData } from "../../../server";
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    let url = new URL(request.url);
    const params = url.searchParams;
    const start = decodeURIComponent(params.get('start'));
    const end = decodeURIComponent(params.get('end'));
    
    const data = await fetchPvPowerTrendData(start, end);
    return Response.json(await data.json());
  } catch (error) {
    return Response.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}