"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { HashLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

interface User {
	email: string;
	username: string;
	password: string;
}
const SignUpPage = () => {
	const router = useRouter();
	const [user, setUser] = useState<User>({
		email: "",
		username: "",
		password: "",
	});
	const emailRegex =
		/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/;
	const [disableButton, setDisableButton] = useState<boolean>(true);
	const [isSigning, setIsSigning] = useState<boolean>(false);

	const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prev) => ({ ...prev, [name]: value }));
	};
	useEffect(() => {
		if (
			user.username.length > 0 &&
			user.password.length > 0 &&
			user.email.length > 0
		) {
			setDisableButton(false);
		} else {
			setDisableButton(true);
		}
	}, [user]);

	const onSignUp = async () => {
		try {
			// Test email input
			const isEmailValid = emailRegex.test(user.email);
			if (isEmailValid) {
				setIsSigning(true);
				await toast.promise(axios.post("/api/users/signup", user), {
					loading: "Signing you Up",
					success: "Signed Up 👌",
					error: "Error Signing Up 🤯",
				});
				router.push("/login");
			} else {
				console.log("ggs");
				toast.error("Email is invalid");
			}
		} catch (error: any) {
			console.log("Sign Up Failed ", error.response.data);
			console.log(error);
			toast.error(error.response.data.error);
		} finally {
			setIsSigning(false);
		}
	};
	return (
		<div className="p-2 flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Sign Up</h1>
			<hr />
			<label htmlFor="username">Username</label>
			<input
				className="p-2 text-black  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
				type="text"
				name="username"
				id="username"
				value={user.username}
				onChange={handleSetUser}
				placeholder="Mahmoud"
			/>
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
				className="p-2 text-black  border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
					onClick={onSignUp}
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
					SignUp
				</button>
			)}

			<div>
				<span>Already have an account? </span>
				<Link href="/login" className="hover:text-blue-300">
					LogIn
				</Link>
			</div>
		</div>
	);
};

export default SignUpPage;
