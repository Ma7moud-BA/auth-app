import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please Provider a username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Please Provider an email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please Provider a password"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: String,
	forgotPasswordTokenExpiry: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

//check if the User model schema is already exists, if not make one
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
