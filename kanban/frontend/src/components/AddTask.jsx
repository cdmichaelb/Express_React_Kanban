// Add task to a column within the same board

const AddTask = () => {
	return (
		<div>
			<h1>Add Task</h1>
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
export default AddTask;
