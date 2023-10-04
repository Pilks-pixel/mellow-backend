import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";

dotenv.config();

// server
const app: Application = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Express is running on port ${port}`);
});

// route
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Express & TypeScript Server");
});


