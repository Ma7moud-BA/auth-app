import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { hashPassword } from "@/utils/encryptingPassword";
import { sendEmail } from "@/helpers/helpers";
connect();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		console.log(body);
		const { username, email, password } = body;

		const user = await User.findOne({ email });
		//check if user exists
		if (user) {
			return new NextResponse(
				JSON.stringify({ error: "User with this email already exists!" }),
				{
					status: 400,
				}
			);
		}
		//hash
		const hashedPassword = await hashPassword(password);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		//send verification email
		await sendEmail(email, "VERIFY", savedUser._id);
		return new NextResponse(
			JSON.stringify({ message: "User created successfully", User: savedUser }),
			{
				status: 201,
			}
		);
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
