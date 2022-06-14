
import express from 'express'
import morgan from 'morgan'
import studentsRoutes from "./routes/students.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

import { createRoles } from "./libs/initialSetup";

const app = express();

createRoles()
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/students', studentsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;