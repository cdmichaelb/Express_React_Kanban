// Create a new Kanban

const CreateKanban = () => {
	return (
		<div>
			<h1>Create a new Kanban</h1>
			<form>
				<label>Name</label>
				<input type="text" name="name" />
				<label>Description</label>
				<input type="text" name="description" />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};
export default CreateKanban;
