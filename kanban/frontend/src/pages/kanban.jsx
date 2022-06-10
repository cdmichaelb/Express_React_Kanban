// Display the kanban and allow the user to Create, Edit, Delete and Move columns and cards
// The user can also drag and drop cards to change their order
// The user can also drag and drop the tasks to change their order

//imports
import React from "react";
import { useState, useEffect } from "reactn";
import axios from "axios";

const Kanban = () => {
	const [kanban, setKanban] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Get kanban data from the server
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://127.0.0.1:3333/kanban/");

				setKanban(response.data);
				console.log(response.data);
				setIsLoading(false);
			} catch (error) {
				setError(error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	// Delete a kanban
	const deleteKanban = async (id) => {
		try {
			const response = await axios.delete(`http://127.0.0.1:3333/kanban/${id}`);
			console.log(response.data);
			setKanban(kanban.filter((kanban) => kanban.id !== response._id));
		} catch (error) {
			setError(error);
		}
	};

	// Create a new kanban
	const createKanban = async (kanban) => {
		try {
			await axios.post("http://127.0.0.1:3333/kanban/", kanban);
			setKanban(kanban);
		} catch (error) {
			setError(error);
		}
	};

	if (isLoading) {
		return <p>Kanban Loading...</p>;
	}

	if (error) {
		return <p>Kanban Error: {error.message}</p>;
	}

	return (
		<div>
			<h1>Kanban</h1>
			<div className="kanban">
				{kanban &&
					kanban.map((kanban) => (
						<div className="kanban-column" key={kanban._id}>
							<h2>{kanban.name}</h2>
							<p>{kanban.description}</p>

							<button onClick={() => deleteKanban(kanban._id)}>Delete</button>
						</div>
					))}
			</div>

			<h2>Create a Kanban</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createKanban({
						name: e.target.name.value,
						description: e.target.description.value,
					});
				}}
			>
				<label>Name:</label>
				<input type="text" name="name" />
				<label>Description:</label>
				<input type="text" name="description" />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default Kanban;
