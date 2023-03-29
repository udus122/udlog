import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { addDashesToUUID } from "./libs/notion/id";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.match(/^\/[a-f0-9]{32}\/?/)) {
    const dashedURL =
      addDashesToUUID(request.nextUrl.pathname.replace("/", "")) ?? "";
    return NextResponse.redirect(new URL(dashedURL, request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
