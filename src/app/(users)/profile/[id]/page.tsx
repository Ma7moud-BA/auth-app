import React from "react";

const UserProfilePage = ({ params }: any) => {
	const { id } = params;
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1>Profile</h1>
			<hr />
			<p>User Profile Page {id}</p>
		</div>
	);
};

export default UserProfilePage;
