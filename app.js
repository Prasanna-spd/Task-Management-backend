import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import projectRouter from "./routes/project.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./data/database.js";
const PORT = process.env.PORT || 5000;

const app = express();

// config({
//   path: ".env",
// });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();

app.use("/api/users", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

app.listen(PORT, () => {
  console.log(`Server is working on port:${PORT}.`);
});
