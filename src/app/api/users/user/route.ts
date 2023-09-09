import { getDateFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { verifyJwt } from "@/utils/jwt";
connect();

export async function GET(request: NextRequest) {
	try {
		const token = request.cookies.get("token")?.value || "";
		const decodedToken = await verifyJwt(token);
		const userId = decodedToken.id;
		//find the user with the id that matches the decodedToken.id excluding the password
		const user = await User.findOne({ _id: userId }).select("-password");
		return new NextResponse(JSON.stringify(user), {
			status: 200,
		});
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
