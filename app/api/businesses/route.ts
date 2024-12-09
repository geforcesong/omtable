import { pool } from "@/server/dbPool";
import { businessFactory } from "@/server/factories/BusinessFactory";
import { apiHandler } from "@/server/services/apiHandler";
import ApiResponse from "@/server/services/apiResponse";
import { NextRequest, NextResponse } from "next/server";

const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const [businesses, totalCount] = await Promise.all([
    businessFactory.fetchBusinesses(page, limit),
    businessFactory.fetchTotalCount(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return NextResponse.json(
    new ApiResponse({
      businesses,
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
    })
  );
});

const PUT = apiHandler(async (request: NextRequest) => {
  const { ids, businessData } = await request.json();
  if (!Array.isArray(ids) || ids.length === 0 || !businessData) {
    throw new Error("No businesses to update");
  }

  businessFactory.updateBusinesses(ids, {
    url: businessData.url,
    location: businessData.location,
    retailer_name: businessData.retailer_name,
    count: businessData.count,
  });
  return NextResponse.json(new ApiResponse(null));
});

export { GET, PUT };
