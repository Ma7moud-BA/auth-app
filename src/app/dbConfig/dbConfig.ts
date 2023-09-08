import mongoose, { mongo } from "mongoose";
export async function connect() {
	try {
		// put a ! mark after the  process.env.MONGO_URI to tell typescript that i know that the uri will be available
		mongoose.connect(process.env.MONGO_URI!);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MongoDB connected successfully");
		});

		connection.on("error", (err) => {
			console.log("MongoDB connection error, " + err);
			process.exit();
		});
	} catch (err) {
		console.log("Something went wrong when trying to connect to mongo");
		console.log(err);
	}
}
