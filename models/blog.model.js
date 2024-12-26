const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please enter a title for the blog"],
			minlength: 3,
		},
		content: {
			type: String,
			required: [true, "Content field can't be empty"],
			minlength: 3,
		},
		author: {
			type: String,
			required: [true, "Author field cannot be empty"]
		},
		userID:{
			type: String,
			required: [true, "userID field can not be empty"]
		}
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Blog", BlogSchema);
