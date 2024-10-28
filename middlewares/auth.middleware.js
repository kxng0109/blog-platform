const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			msg: "User isn't authorized to access this information",
		});
	}

	const token = authHeader.split(' ')[1];

	const {id:userID, name, email} = jwt.verify(token, process.env.JWT_SECRET);
	req.user = {userID, name, email};
	next();
};

module.exports = authenticationMiddleware;
