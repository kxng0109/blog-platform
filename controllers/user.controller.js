const { registerUserAuth, loginUserAuth } = require("./auth.controller");

const registerUser = registerUserAuth;
const loginUser = loginUserAuth;

module.exports = {
	registerUser,
	loginUser,
};
