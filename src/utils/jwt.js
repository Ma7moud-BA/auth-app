import Jwt from "jsonwebtoken";
const default_Options = {
	expiresIn: "1h",
};
export function signJwtAccessToken(payload, options = default_Options) {
	const secretKey = process.env.SECRET_KEY;
	const token = Jwt.sign(payload, secretKey, options);
	return token;
}

// this function returns the decoded data from a provided token
export function verifyJwt(token) {
	try {
		const secretKey = process.env.SECRET_KEY;
		const decoded = Jwt.verify(token, secretKey);
		return decoded;
	} catch (err) {
		console.log(err);
		return null;
	}
}
