const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

// Import routes

// Create Express server
const app = express();

// Middleware

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes

// Connect to MongoDB
const connectDB = async (dbName = process.env.DB_NAME) => {
	try {
		const connection = await mongoose.connect(`mongodb://localhost/${dbName}`);
		if (process.env.ENV !== "test") {
			console.log(`🚀Connected to mongodb://localhost/${dbName}`);
		}
		return connection;
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

// Start server
const startServer = async () => {
	try {
		app.listen(process.env.PORT, async () => {
			await connectDB();
			console.log(`🚀Server started on port ${process.env.PORT}`);
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = {
	startServer,
	app,
	connectDB,
};
