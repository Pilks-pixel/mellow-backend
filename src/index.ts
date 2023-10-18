import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// database connection
const prisma = new PrismaClient();

// server
const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`Express is running on port ${port}`);
});

// user routes
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Express & TypeScript Server");
});

app.get("/users", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({
		include: {
			_count: {
				select: {meditations:true}
			}
		}
	});
	res.json({
		success: true,
		payload: users,
		message: "Operation Successful",
	});
});

app.get("/users/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await prisma.user.findUnique({
		where: { id: id },
		include: {
			meditations: true
		},
	});
	res.json({
		success: true,
		payload: user,
		message: "Successfully found one user",
	});
});

app.post("/users", async (req: Request, res: Response) => {
	const newUser = await prisma.user.create({
		data: { ...req.body },
	});
	res.json({
		success: true,
		payload: newUser,
	});
});


app.put("/users/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const updatedValue = req.body
	const addDuration = await prisma.user.update({
		where: { id: id },
		data: { ...updatedValue}
	});
	res.json({
		success: true,
		payload: addDuration,
	})
})

app.delete("/users/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const deleteUser = await prisma.user.delete({
		where: {
			id: id,
		},
	});
	res.json({
		success: true,
		payload: deleteUser,
	});
})

// meditaiton routes
app.post("/meditations", async (req: Request, res: Response) => {
	const {type, duration, completed, userEmail} = req.body 
	const newMeditation = await prisma.meditation.create({
		data: {
			type,
			duration,
			completed,
			student: {connect: {email: userEmail} }
		},
	});
	res.json({
		success: true,
		payload: newMeditation,
	});
})

app.delete("/meditations", async (req: Request, res: Response) => {
	const { id } = req.params;
	const deleteUser = await prisma.meditation.deleteMany({});
	res.json({
		success: true,
		payload: deleteUser,
	});
});

// Delete Meditations from one User
app.delete("/meditations/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const deleteUser = await prisma.meditation.deleteMany({
		where: {
			studentId: id,
		},
	});
	res.json({
		success: true,
		payload: deleteUser,
	});
});

// error route handling
app.use((req: Request, res: Response, next) => {
	res.status(404);
	return res.json({
		success: false,
		payload: null,
		message: `bad API request: Endpoint not found for path: ${req.path}`,
	});
});
