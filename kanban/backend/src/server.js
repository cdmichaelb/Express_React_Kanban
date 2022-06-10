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
const kanbanRoutes = require("./routes/kanban.routes");
const authRoutes = require("./routes/auth.routes");
const columnRoutes = require("./routes/column.routes");
const taskRoutes = require("./routes/task.routes");
// const adminRoutes = require("./routes/admin.routes");

// Create Express server
const app = express();

// Middleware

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// Routes
app.use("/kanban", kanbanRoutes);
app.use("/", authRoutes);
app.use("/api/kanban", columnRoutes);
app.use("/api/kanban", taskRoutes);
// app.use("/admin", adminRoutes);

// Connect to MongoDB
const connectDB = async (dbName = process.env.DB_NAME) => {
	try {
		const connection = await mongoose.connect(`mongodb://127.0.0.1/${dbName}`);
		if (process.env.ENV !== "test") {
			console.log(`\n💾Connected to mongodb://127.0.0.1/${dbName}`);
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
			console.log(`🚀Server started at http://127.0.0.1:${process.env.PORT}\n`);
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
