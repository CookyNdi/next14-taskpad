import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiUploadthingPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  let isLoggedIn = false;
  if (cookies) {
    if (cookies.get("access_token")) {
      isLoggedIn = true;
    }
  }
  // TODO : Fixing middleware
  console.log(nextUrl.pathname);
  const isUploadthingRoute = apiUploadthingPrefix.startsWith(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log({ isLoggedIn, isUploadthingRoute, isAuthRoute, isPublicRoute });

  if (isUploadthingRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
