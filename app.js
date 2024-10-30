const express = require("express");
const app = express();
require("dotenv").config();

const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./db/connectDB");

const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");


app.set('trust proxy', 1);
app.use(express.json());
// app.use(express.static('./public/'))
app.use(helmet());
app.use(cors());

app.use("/app", userRouter);
app.use("/app/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`Listening on port ${PORT}`);
	} catch (err) {
		console.log(err);
	}
});
