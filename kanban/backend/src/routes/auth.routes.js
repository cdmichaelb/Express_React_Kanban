const { AsyncRouter: Router } = require("express-async-router");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { loginValidator, signupValidator } = require("../helpers/validators");

const handleValidationErrors = require("../helpers/handleValidationErrors");

const router = Router();

// Signup
router.post(
	"/signup",
	[...signupValidator, handleValidationErrors],
	async (req, res) => {
		const { username, email, password } = req.body;
		console.log(req.body);
		const userExists = await User.findOne({ name: username });
		console.log(userExists);
		if (userExists) {
			return res.status(400).send({
				message: "Username already exists",
			});
		}

		try {
			const user = await User.signup(username, email, password);
			res.send(user.sanitize());
		} catch (error) {
			return res.status(400).send({
				message: error.message,
			});
		}
	}
);

// Login
router.post(
	"/login",
	[...loginValidator, handleValidationErrors],
	async (req, res) => {
		const { username, password } = req.body;

		try {
			const user = await User.findOne({ username });
			if (!user || !(await user.comparePassword(password))) {
				return res.status(400).send({
					message: "User does not exist or password is incorrect",
				});
			}

			const token = jwt.sign(user.sanitize(), process.env.JWT_SECRET);
			res.send({ token, user: user.sanitize() });
		} catch (error) {
			return res.status(400).send({
				message: error.message,
			});
		}
	}
);

module.exports = router;
