import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL);
		console.log(
			`MongoDB database connected successfully!: ${conn.connection.host}`
		);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1); // process code 1 means exit with failure and 0 means success
	}
};
