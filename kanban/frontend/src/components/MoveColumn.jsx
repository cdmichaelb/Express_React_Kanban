// Move column within the same board

const MoveColumn = () => {
	return (
		<div>
			<h1>Move Column</h1>
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

export default MoveColumn;
