import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from 'morgan'
import { corsConfig } from "./confing/cors";
import { connectDB } from "./confing/db";
import projectRoutes from "./routes/projectRoutes"

dotenv.config()
connectDB()

const app = express()
app.use(cors(corsConfig))
// Loggin
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/projects', projectRoutes)

export default app