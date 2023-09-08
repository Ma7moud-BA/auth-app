import { NextResponse } from "next/server";
export async function GET() {
	try {
		const response = new NextResponse(
			JSON.stringify({ message: "Logged out successfully" }),
			{ status: 200 }
		);
		//* removing the cookies when logged out
		response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
		return response;
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ error: err.message }), {
			status: 400,
		});
	}
}
