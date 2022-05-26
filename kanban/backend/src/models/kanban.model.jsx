// many-to-one with users
// one-to-many with tasks

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Model
const kanbanSchema = new Schema({
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
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

// Methods

// Middleware

// Export
module.exports = mongoose.model("Kanban", kanbanSchema);
