import { NextRequest } from "next/server";
import { verifyJwt } from "@/utils/jwt";
export const getDateFromToken = (request: NextRequest) => {
	try {
		const token = request.cookies.get("token")?.value || "";
		const decodedToken = verifyJwt(token);
		return decodedToken.id;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
