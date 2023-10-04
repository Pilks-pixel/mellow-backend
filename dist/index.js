import express from "express";
import dotenv from 'dotenv';
dotenv.config();
// server
const app = express();
const port = process.env || 8000;
app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
});
// route
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
