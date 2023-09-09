import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { token } = body;
		// search for the user with this token
		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid token or user not found" },
				{ status: 400 }
			);
		}
		//if the user if found and the hashed token matches then verify the user
		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
		await user.save();

		return NextResponse.json({
			message: "Email verified successfully",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
