import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	console.log(request.nextUrl);
	const isPublicPath = path === "/login" || path === "/signup";

	const token: string = request.cookies.get("token")?.value || "";

	// if the user tries to go to /login or /signup and he is logged in already he will be redirected to '/'
	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}
	// if the user tries to go to /profile and he is not logged in he will be redirected to the login page
	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/profile", "/login", "/signup"],
};
