const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader.split(' ')[1];

	if (!authHeader || !authHeader.startsWith("Bearer ") || !token || token == "null") {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			msg: "User isn't authorized to access this information",
		});
	}

	const {id:userID, name, email} = jwt.verify(token, process.env.JWT_SECRET);
	req.user = {userID, name, email};
	next();
};

module.exports = authenticationMiddleware;
