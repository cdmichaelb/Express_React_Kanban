// MongoDB
// many-to-many with kanbans
// many-to-many with tasks
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Model
const tagSchema = new Schema({
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
});

// Methods
const tagMethods = {
	toJSON() {
		const tag = this;
		const tagObject = tag.toObject();

		return tagObject;
	},
};

// Middleware

// Export
const Tag = mongoose.model("Tag", tagSchema);
Tag.methods = tagMethods;
module.exports = Tag;
