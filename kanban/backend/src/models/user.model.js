// MongoDB
// one-to-many with kanbans
// one-to-many with tasks
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// Model
const userSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 25,
		},
		email: {
			type: String,
			required: true,
			minlength: 4,
			maxlength: 25,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 50,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Virtuals

userSchema.virtual("kanbans", {
	ref: "Kanban",
	localField: "_id",
	foreignField: "users",
});

userSchema.virtual("tasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "user",
});

// Statics
userSchema.statics.signup = async function (username, email, password) {
	const user = new this();

	user.name = username;
	user.email = email;
	user.password = password;

	try {
		await user.save();
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

// Methods

userSchema.methods.sanitize = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;

	return userObject;
};

userSchema.methods.comparePassword = function (password) {
	const user = this;

	return bcrypt.compareSync(password, user.password);
};

// Middleware

// Export
const User = mongoose.model("User", userSchema);
module.exports = User;
