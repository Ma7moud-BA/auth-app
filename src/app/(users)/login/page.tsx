"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";

interface UserLogin {
	email: string;
	password: string;
}
const LoginInPage = () => {
	const router = useRouter();

	const [user, setUser] = useState<UserLogin>({
		email: "",
		password: "",
	});
	const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prev) => ({ ...prev, [name]: value }));
	};
	const [disableButton, setDisableButton] = useState<boolean>(true);
	const [isSigning, setIsSigning] = useState<boolean>(false);

	useEffect(() => {
		if (user.password.length > 0 && user.email.length > 0) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
		}
	}, [user]);

	const onLogIn = async () => {
		try {
			setIsSigning(true);
			// const res = await axios.post("/api/users/login", user);
			await toast.promise(axios.post("/api/users/login", user), {
				loading: "Logging you In",
				success: "Logged In 👌",
				error: "Error Logging In 🤯",
			});

			router.push("/profile");
		} catch (error: any) {
			console.log("Sign Up Failed ", error.message);
			toast.error(error.message);
		} finally {
			setIsSigning(false);
		}
	};
	return (
		<div className="p-2 flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Login In Page</h1>
			<hr />

			<label htmlFor="email">Email</label>
			<input
				className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
				type="email"
				name="email"
				id="email"
				value={user.email}
				onChange={handleSetUser}
				placeholder="gg.ez.com"
			/>
			<label htmlFor="password">Password</label>
			<input
				className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
				type="password"
				name="password"
				id="password"
				value={user.password}
				onChange={handleSetUser}
				placeholder="*******"
			/>
			{isSigning ? (
				<HashLoader color="green" />
			) : (
				<button
					onClick={onLogIn}
					disabled={disableButton}
					style={{
						opacity: disableButton ? 0.5 : 1,
						cursor: disableButton ? "not-allowed" : "pointer",
					}}
					className={`${
						!disableButton
							? "hover:bg-slate-200 hover:text-black hover:border-black"
							: ""
					} p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}
				>
					Login
				</button>
			)}
			<div>
				<span>Don&apos;t have an account? </span>
				<Link href="/signup" className="hover:text-blue-300">
					SignUp
				</Link>
			</div>
		</div>
	);
};

export default LoginInPage;
