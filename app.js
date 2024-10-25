const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db/connectDB");

const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");


app.use(express.json());
app.use(express.static('./public/'))

app.use("/app", userRouter);
app.use("/app/blog", blogRouter);

const PORT = 3000;

app.listen(PORT, async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`Listening on port ${PORT}`);
	} catch (err) {
		console.log(err);
	}
});
