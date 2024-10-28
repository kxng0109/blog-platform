const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please enter your username"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide valis email",
		],
	},
	password: {
		type: String,
		required: [true, "Please enter a password not less than 10 characters"],
		minlength: 10,
	}
});

UserSchema.pre("save", function () {
	const genSalt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, genSalt);
});

UserSchema.methods.verify = function(password){
	return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.generateToken = function(){
	const token = jwt.sign({id: this._id, name: this.username, email: this.email}, process.env.JWT_SECRET, {
		expiresIn: process.env.expiresIn
	});
	return token;
}

module.exports = mongoose.model("User", UserSchema);
