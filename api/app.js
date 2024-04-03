import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
