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
		time: {
			type: Date,
			default: new Date().getTime(),
		},
		from: {
			type: String,
			default: this.email,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Blog", BlogSchema);
