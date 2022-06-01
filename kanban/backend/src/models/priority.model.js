// MongoDB
// one-to-one with tasks
// MongoDB
// one-to-one with tasks
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Model
const prioritySchema = new Schema(
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
			maxlength: 25,
		},
		tasks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Task",
			},
		],
	},
	{
		timestamps: true,
	}
);

// Methods
const priorityMethods = {
	toJSON() {
		const priority = this;
		const priorityObject = priority.toObject();

		return priorityObject;
	},
};

// Middleware

// Export
const Priority = mongoose.model("Priority", prioritySchema);
Priority.methods = priorityMethods;
module.exports = Priority;
