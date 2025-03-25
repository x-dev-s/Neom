import { fetchGeneratorDailyYieldData } from "../../../server";
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    let url = new URL(request.url);
    const params = url.searchParams;
    const span = decodeURIComponent(params.get('span'));
    const id = decodeURIComponent(params.get('id'));
    const data = await fetchGeneratorDailyYieldData(id, span);
    return Response.json(await data.json());
  } catch (error) {
    return Response.json(
      { message: 'Error fetching data', error: error.message },
      { status: 500 }
    );
  }
}