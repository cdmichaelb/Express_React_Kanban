const { AsyncRouter: Router } = require("express-async-router");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Kanban = require("../models/kanban.model");

const router = Router();

// Create a new kanban
router.post("/", async (req, res) => {
	const { name, description, users } = req.body;

	try {
		const kanban = await Kanban.create(name, description, users);
		res.send(kanban);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// View a kanban
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const kanban = await Kanban.findById(id);
		res.send(kanban);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// Update a kanban
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { name, description, users } = req.body;

	try {
		const kanban = await Kanban.update(id, name, description, users);
		res.send(kanban);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// Delete a kanban
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const kanban = await Kanban.delete(id);
		res.send(kanban);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// View all kanbans belonging to logged in user
router.get("/", async (req, res) => {
	const { id } = req.user;

	try {
		const kanbans = await Kanban.findAll(id);
		res.send(kanbans);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

module.exports = router;
