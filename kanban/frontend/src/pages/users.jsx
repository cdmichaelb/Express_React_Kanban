// User Login and Logout
// Register new users

// Includes
import React from "react";
import { useState, useEffect } from "reactn";

const Users = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/user");
				const json = await response.json();
				setUser(json);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <p>Users Loading...</p>;
	}

	if (error) {
		return <p>Users Error: {error.message}</p>;
	}

	return (
		<div>
			<h1>User</h1>
			<p>{user.name}</p>
			<p>{user.email}</p>
			<p>{user.role}</p>
			<p>{user.createdAt}</p>
			<p>{user.updatedAt}</p>
		</div>
	);
};

export default Users;
