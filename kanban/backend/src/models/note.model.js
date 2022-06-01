// MongoDB
// one-to-one with tasks
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Model
const noteSchema = new Schema({
	title: {
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
	task: {
		type: Schema.Types.ObjectId,
		ref: "Task",
	},
});

// Methods
const noteMethods = {
	toJSON() {
		const note = this;
		const noteObject = note.toObject();

		return noteObject;
	},
};

// Middleware

// Export
const Note = mongoose.model("Note", noteSchema);
Note.methods = noteMethods;
module.exports = Note;
