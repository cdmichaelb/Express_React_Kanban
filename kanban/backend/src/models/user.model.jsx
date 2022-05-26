// one-to-many with kanbans
// one-to-many with tasks
const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

// Model
const userSchema = new Schema(
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

// Methods

userSchema.methods.toJSON = function () {
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
userSchema.pre("save", function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
	}

	next();
});

// Export
module.exports = mongoose.model("User", userSchema);
