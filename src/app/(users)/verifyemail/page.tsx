"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// the page is to receive the hashed token from the user when clicking on the email he received
export default function VerifyEmailPage() {
	const [token, setToken] = useState("");
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState(false);

	const verifyUserEmail = async () => {
		try {
			//send the token received from the email to the backend to compare it to the token that is stored in the db
			await axios.post("/api/users/verifyemail", { token });
			setVerified(true);
		} catch (error: any) {
			setError(true);
			console.log(error.response.data);
		}
	};

	useEffect(() => {
		// get the hashed token from the url
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	useEffect(() => {
		// execute the verifyUserEmail function
		if (token.length > 0) {
			verifyUserEmail();
		}
	}, [token]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-4xl">Verify Email</h1>
			<h2 className="p-2 bg-green-500 text-black">
				{token ? `${token}` : "no token"}
			</h2>

			{verified && (
				<div>
					<h2 className="text-2xl">Email Verified</h2>
					<Link href="/login">Login</Link>
				</div>
			)}
			{error && (
				<div>
					<h2 className="text-2xl bg-red-500 text-black">Error</h2>
				</div>
			)}
		</div>
	);
}
