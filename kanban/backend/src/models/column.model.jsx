// MongoDB
// many-to-one with kanbans

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Model
const columnSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 25,
	},
	description: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 25,
	},
	tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	kanban: {
		type: Schema.Types.ObjectId,
		ref: "Kanban",
	},
});

// Methods
const columnMethods = {
	toJSON() {
		const column = this;
		const columnObject = column.toObject();

		return columnObject;
	},
};

// Middleware

// Export
const Column = mongoose.model("Column", columnSchema);
Column.methods = columnMethods;
module.exports = Column;
