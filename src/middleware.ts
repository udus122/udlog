import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

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

// uuidHex type is uuid4 without dashes
export function addDashesToUUID(uuid: string) {
  if (!/^[0-9a-f]{32}$/.test(uuid)) {
    return;
  }

  return uuid.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}
