const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");

const registerUserAuth = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Provide the necessary details" });
		}

		if (password.length < 10) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Can't set a password less than 10 characters" });
		}

		const emailExists = await User.exists({ email });
		if (emailExists) {
			return res.status(StatusCodes.FORBIDDEN).json({
				msg: "Can't create this account as the email exists.",
			});
		}

		// let user = 'King'
		const user = await User.create({ ...req.body });
		// console.log(user._id);
		return res.status(StatusCodes.CREATED).json({
			msg: `Account created, welcome ${user.username}`,
		});
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.BAD_REQUEST).json({ msg: error });
	}
};

const loginUserAuth = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Provide the necessary details" });
	}
	const user = await User.findOne({ email });
	if (!user) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ err: `User with email: ${email} not found.` });
	}

	const isVerified = user.verify(password);
	if (!isVerified) {
		return res
			.status(StatusCodes.FORBIDDEN)
			.json({ msg: "Invalid credentials" });
	}
	const token = user.generateToken();
	return res.status(200).json({ msg: `Welcome ${user.username}`, token });
};

module.exports = {
	registerUserAuth,
	loginUserAuth,
};
