const { AsyncRouter: Router } = require("express-async-router");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Kanban = require("../models/kanban.model");

const router = Router();

// Create a new kanban **WORKING
router.post("/", async (req, res) => {
	const { name, description, users } = req.body;

	try {
		const kanban = await Kanban.create(name, description, users);
		console.log(kanban);
		return res.send(kanban);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// View a kanban **WORKING
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
		const kanban = await Kanban.updateOne(id, name, description, users);
		res.send(kanban);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// Delete a kanban **WORKING
router.delete("/:_id", async (req, res) => {
	try {
		const kanban = await Kanban.findById(req.params._id);
		kanban.delete();

		return res.send(kanban);
	} catch (error) {
		return res.status(400).send({
			message: error.message,
		});
	}
});

// View all kanbans belonging to logged in user **WORKING
router.get("/", async (req, res) => {
	// if no id is provided, return all kanbans
	if (req.user) {
		try {
			const kanbans = await Kanban.findAll(req.user.id);
			res.send(kanbans);
		} catch (error) {
			return res.status(400).send({
				message: error.message,
			});
		}
	} else {
		return res.send(await Kanban.find());
	}
});

module.exports = router;
