import * as bcrypt from "bcrypt";

//hash a password
export const hashPassword = async (password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
};
//compare password
export const comparePassword = async (password, storedPassword) => {
	const samePassword = await bcrypt.compare(password, storedPassword);
	return samePassword;
};
