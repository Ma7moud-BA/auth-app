import nodemailer from "nodemailer";
import User from "@/models/userModel";
import { hashPassword } from "@/utils/encryptingPassword";

// sending verification email to the client but this is testing stage so all the mails go to mailtrap.io testing inbox
export const sendEmail = async (
	email: string,
	emailType: string,
	userId: String
) => {
	// console.log(email, emailType, userId.toString());
	try {
		// create a hashed token, we need any hashed value but our main goal is to match this value between the frontend and the backend so we used the userId but we can use anything else
		const hashedToken = await hashPassword(userId.toString());

		if (emailType === "VERIFY") {
			//store the hashed token in the db
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
			//todo:not functioning yet
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}
		//nodemailer setup
		var transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS,
			},
		});
		//sending a link to the user the link looks like this
		/**
		 * Click here to verify your email or copy and paste the link below in your browser.
			http://localhost:3000/verifyemail?token=$2b$10$TnlBpxVqfatehdHI3TQAv.EcyEisjPUUyBIcxw2spV2wMjeAulT52
		 */
		//when the user clicks on the email he will be directed to the verifyemail with the hashed token page to complete the verification
		const mailOptions = {
			from: "mahmoudbanyamer99@gmail.com",
			to: email,
			subject:
				emailType === "VERIFY" ? "Verify your email" : "Reset your password",
			html: `<p>Click <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">here</a> to ${
				emailType === "VERIFY" ? "verify your email" : "reset your password"
			}
            or copy and paste the link below in your browser. <br> ${
							process.env.DOMAIN
						}/verifyemail?token=${hashedToken}
            </p>`,
		};

		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		console.log("error is from here");
		throw new Error(error.message);
	}
};
