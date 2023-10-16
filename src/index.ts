import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

dotenv.config();

// database connection
const prisma = new PrismaClient();

// server
const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.listen(port, () => {
	console.log(`Express is running on port ${port}`);
});

// route
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Express & TypeScript Server");
});

app.get("/users", async (req, res) =>{
	const users = await prisma.user.findMany()
	res.json({
		success: true,
		payload: users,
		message: "Operation Successful",
	});
})

app.use((req, res, next) => {
	res.status(404)
	return res.json({
		success: false,
		payload: null,
		message: `bad API request: Endpoint not found for path: ${req.path}`
	})
})
