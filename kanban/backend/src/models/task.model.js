// MongoDB
// one-to-one with columns
// one-to-one with kanbans

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// Model
const taskSchema = new Schema(
	{
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
			maxlength: 250,
		},
		priority: {
			type: ObjectId,
			ref: "Priority",
		},
		column: {
			type: ObjectId,
			ref: "Column",
		},
		user: {
			type: ObjectId,
			ref: "User",
		},
		kanban: {
			type: ObjectId,
			ref: "Kanban",
		},
	},
	{
		timestamps: true,
	}
);

// Methods

// Middleware

// Export
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
