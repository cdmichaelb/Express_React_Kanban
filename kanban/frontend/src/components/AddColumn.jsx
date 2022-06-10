// Add a column to a kanban board

const AddColumn = () => {
	return (
		<div>
			<h1>Add Column</h1>
			<form>
				<label>Title</label>
				<input type="text" name="title" />
				<label>Description</label>
				<input type="text" name="description" />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default AddColumn;
