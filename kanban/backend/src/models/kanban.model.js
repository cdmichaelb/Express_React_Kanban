// MongoDB
// many-to-one with users
// one-to-many with tasks

const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

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
			type: ObjectId,
			ref: "Task",
		},
	],
	users: [
		{
			type: ObjectId,
			ref: "User",
		},
	],
});

// Statics
kanbanSchema.statics.create = async function (name, description, users) {
	const kanban = new this();

	kanban.name = name;
	kanban.description = description;
	kanban.users = users;

	try {
		await kanban.save();
		return kanban;
	} catch (error) {
		throw new Error(error);
	}
};

kanbanSchema.statics.update = async function (id, name, description, users) {
	try {
		const updatedKanban = await this.findByIdAndUpdate(id, {
			name,
			description,
			users,
		});
		return updatedKanban;
	} catch (error) {
		throw new Error(error);
	}
};

kanbanSchema.statics.delete = async function (id) {
	try {
		const deletedKanban = await this.findByIdAndDelete(id);
		return deletedKanban;
	} catch (error) {
		throw new Error(error);
	}
};

// Methods
kanbanSchema.methods.addTask = async function (task) {
	this.tasks.push(task);
	try {
		await this.save();
		return this;
	} catch (error) {
		throw new Error(error);
	}
};

kanbanSchema.methods.removeTask = async function (task) {
	this.tasks.pull(task);
	try {
		await this.save();
		return this;
	} catch (error) {
		throw new Error(error);
	}
};

kanbanSchema.methods.addUser = async function (user) {
	this.users.push(user);
	try {
		await this.save();
		return this;
	} catch (error) {
		throw new Error(error);
	}
};

kanbanSchema.methods.removeUser = async function (user) {
	this.users.pull(user);
	try {
		await this.save();
		return this;
	} catch (error) {
		throw new Error(error);
	}
};

kanbanSchema.methods.addColumn = async function (column) {
	this.columns.push(column);
	try {
		await this.save();
		return this;
	} catch (error) {
		throw new Error(error);
	}
};

kanbanSchema.methods.removeColumn = async function (column) {
	this.columns.pull(column);
	try {
		await this.save();
		return this;
	} catch (error) {
		throw new Error(error);
	}
};

// Middleware

// Export
const Kanban = mongoose.model("Kanban", kanbanSchema);
module.exports = Kanban;
