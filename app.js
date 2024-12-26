const express = require("express");
const app = express();
require("dotenv").config();

const helmet = require("helmet");
const cors = require("cors");
const {rateLimit} = require("express-rate-limit");

const connectDB = require("./db/connectDB");

const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false
});

app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limiter);

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
