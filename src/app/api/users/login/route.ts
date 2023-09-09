import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { comparePassword } from "@/utils/encryptingPassword";
import { signJwtAccessToken } from "@/utils/jwt";
connect();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { email, password } = body;

		const user = await User.findOne({ email });
		// check if user exists
		if (!user) {
			return new NextResponse(
				JSON.stringify({ error: "User does not exist" }),
				{
					status: 404,
				}
			);
		}
		//check password match
		const validPassword = await comparePassword(password, user.password);
		if (!validPassword) {
			return new NextResponse(JSON.stringify({ error: "Invalid Password" }), {
				status: 409,
			});
		}
		//create token data
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};
		const token = await signJwtAccessToken(tokenData);

		const response = new NextResponse(
			JSON.stringify({ message: "Login successful" }),
			{ status: 200 }
		);
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ error: err.message }), {
			status: 400,
		});
	}
}
