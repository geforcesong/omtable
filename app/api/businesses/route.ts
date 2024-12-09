import { pool } from "@/server/dbPool";
import { apiHandler } from "@/server/services/apiHandler";
import ApiResponse from "@/server/services/apiResponse";
import { Business } from "@/types/business.types";
import { NextRequest, NextResponse } from "next/server";

const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (page <= 0 || limit <= 0) {
    throw new Error("Page and limit must be positive numbers");
  }

  const offset = (page - 1) * limit;
  const res = await pool.query(
    `SELECT * FROM public."Business" 
     ORDER BY id ASC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const countResult = await pool.query(
    'SELECT COUNT(*) FROM public."Business"'
  );

  const totalCount = parseInt(countResult.rows[0].count);
  const totalPages = Math.ceil(totalCount / limit);

  return NextResponse.json(
    new ApiResponse({
      businesses: res.rows.map((row) => ({
        ...row,
        count: Number(row.count),
      })) as Business[],
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
    })
  );
});

export { GET };
