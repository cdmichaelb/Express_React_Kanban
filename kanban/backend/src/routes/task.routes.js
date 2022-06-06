// Router to handle Tasks within a Kanban
// includes
const { AsyncRouter: Router } = require("express-async-router");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../middleware/jwt.Middleware");
const User = require("../models/user.model");
const Kanban = require("../models/kanban.model");
const Task = require("../models/task.model");
const Task = require("../models/task.model");

const router = Router();

// Create a new task
router.post("/:id/tasks", [jwtMiddleware], async (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;

	try {
		const kanban = await Kanban.findById(id);
		const task = await Task.create(name, description, kanban);
		kanban.tasks.push(task);
		kanban.save();
		res.send(task);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// View a task
router.get("/:id/tasks/:taskId", [jwtMiddleware], async (req, res) => {
	const { id, taskId } = req.params;

	try {
		const task = await Task.findById(taskId);
		res.send(task);
	} catch (error) {
		return res.status(400).send({
			message: `Task with id ${taskId} does not exist`,
		});
	}
});

// Update a task
router.put("/:id/tasks/:taskId", [jwtMiddleware], async (req, res) => {
	const { id, taskId } = req.params;
	const { name, description } = req.body;

	try {
		const task = await Task.updateOne(taskId, name, description);
		res.send(task);
	} catch (error) {
		return res.status(400).send({
			message: `Task with id ${taskId} does not exist`,
		});
	}
});

// Delete a task
router.delete("/:id/tasks/:taskId", [jwtMiddleware], async (req, res) => {
	const { id, taskId } = req.params;
	const { name, description } = req.body;

	try {
		const task = await Task.findById(taskId);
		task.delete();

		return res.send(task);
	} catch (error) {
		return res.status(400).send({
			message: `Task with id ${taskId} does not exist`,
		});
	}
});

// Get all tasks in a kanban
router.get("/:id/tasks", [jwtMiddleware], async (req, res) => {
	const { id } = req.params;

	try {
		const kanban = await Kanban.findById(id);
		res.send(kanban.tasks);
	} catch (error) {
		return res.status(400).send({
			message: `Kanban with id ${id} does not exist`,
		});
	}
});
