import { NextRequest, NextResponse } from "next/server";
import ApiResponse from "./apiResponse";

type ApiHandler = (req: NextRequest, context?: any) => Promise<NextResponse>;

export function apiHandler(handler: ApiHandler) {
  return async (req: NextRequest, context?: any) => {
    try {
      return await handler(req, context);
    } catch (err: any) {
      console.log(err);
      const errRes = new ApiResponse(
        null,
        err?.message || "Internal Server Error",
        ""
      );
      return NextResponse.json(errRes, { status: 500 });
    }
  };
}
