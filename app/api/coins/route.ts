import { NextRequest, NextResponse } from "next/server";
import { getCoinsLogic } from "@/data/coinService";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params = {
    query: searchParams.get("q") || undefined,
    sort: searchParams.get("sort") || undefined,
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "50"),
    ids: searchParams.get("ids") || undefined,
  };

  const result = getCoinsLogic(params);

  return NextResponse.json(result);
}
