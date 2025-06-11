import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// to use environment variables
dotenv.config();

const app = express();

const port = 8080;

// middlewares
app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => res.send("hello"));

app.use("/api/product", productRoutes);

const startServer = async () => {
	try {
		await connectDB();
		app.listen(port, () => {
			console.log(`Server started at: http://localhost:${port}`);
		});
	} catch (error) {
		console.error(`Failed to start the server: ${error.message}`);
	}
};

startServer();
