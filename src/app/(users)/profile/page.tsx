"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const ProfilePAge = () => {
	const router = useRouter();
	interface User {
		_id: string;
		email: string;
		isAdmin: boolean;
		isVerified: boolean;
		username: string;
	}
	const [user, setUser] = useState<User | null>();

	const handleLogout = async () => {
		try {
			await toast.promise(axios.get("/api/users/logout"), {
				loading: "Logging you out",
				success: "Logged Out 👌",
				error: "Error Logging Out 🤯",
			});
			router.push("/login");
		} catch (error: any) {
			console.log(error);
		}
	};
	useEffect(() => {
		try {
			const getUserDetails = async () => {
				const res = await axios.get("api/users/user");
				setUser(res.data);
			};
			getUserDetails();
		} catch (error) {}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<hr />
			<p>profile Page</p>
			<h2>
				{user ? (
					<div>
						<h2>{user.username}</h2>
						<h2>{user.email}</h2>
					</div>
				) : (
					""
				)}
			</h2>
			<hr />
			<button
				onClick={handleLogout}
				className="bg-green-300 mt-4 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
			>
				Logout
			</button>
		</div>
	);
};

export default ProfilePAge;
