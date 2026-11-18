import { NextResponse, type NextRequest } from "next/server";

/*
 * Maintenance mode: with MAINTENANCE_MODE=on every page shows /maintenance with a 503 and a
 * Retry-After, so search engines and uptime checks know it's temporary. Static assets still
 * load. Update app/_content/maintenance.ts with the window before switching it on.
 */
export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "on" || request.nextUrl.pathname === "/maintenance") {
    return NextResponse.next();
  }
  const response = NextResponse.rewrite(new URL("/maintenance", request.url), { status: 503 });
  response.headers.set("Retry-After", "3600");
  return response;
}

export const config = {
  // Everything except Next.js assets, images, fonts and dev placeholders.
  matcher: ["/((?!_next/|placeholders/|fonts/|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|woff2?)$).*)"],
};
