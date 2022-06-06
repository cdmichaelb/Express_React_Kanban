// Router to handle Columns within a Kanban
// includes
const { AsyncRouter: Router } = require("express-async-router");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../middleware/jwt.Middleware");
const User = require("../models/user.model");
const Kanban = require("../models/kanban.model");
const Column = require("../models/column.model");
const Task = require("../models/task.model");

const router = Router();

// Create a new column
router.post("/:id/columns", [jwtMiddleware], async (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;

	try {
		const kanban = await Kanban.findById(id);
		const column = await Column.create(name, description, kanban);
		kanban.columns.push(column);
		kanban.save();
		res.send(column);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// View a column
router.get("/:id/columns/:columnId", [jwtMiddleware], async (req, res) => {
	const { id, columnId } = req.params;

	try {
		const column = await Column.findById(columnId);
		res.send(column);
	} catch (error) {
		return res.status(400).send({
			message: `Column with id ${columnId} does not exist`,
		});
	}
});

// Update a column
router.put("/:id/columns/:columnId", [jwtMiddleware], async (req, res) => {
	const { id, columnId } = req.params;
	const { name, description } = req.body;

	try {
		const column = await Column.updateOne(columnId, name, description);
		res.send(column);
	} catch (error) {
		return res.status(400).send({
			message: `Column with id ${columnId} does not exist`,
		});
	}
});

// Delete a column
router.delete("/:id/columns/:columnId", [jwtMiddleware], async (req, res) => {
	const { id, columnId } = req.params;
	const { name, description } = req.body;

	try {
		const column = await Column.findById(columnId);
		column.delete();

		return res.send(column);
	} catch (error) {
		return res.status(400).send({
			message: `Column with id ${columnId} does not exist`,
		});
	}
});

// Get all columns in a kanban
router.get("/:id/columns", [jwtMiddleware], async (req, res) => {
	const { id } = req.params;

	try {
		const kanban = await Kanban.findById(id);
		res.send(kanban.columns);
	} catch (error) {
		return res.status(400).send({
			message: `Kanban with id ${id} does not exist`,
		});
	}
});
