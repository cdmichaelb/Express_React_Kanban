// Move task within the same column
const MoveTask = () => {
	return (
		<div>
			<h1>Move Task</h1>
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
export default MoveTask;
