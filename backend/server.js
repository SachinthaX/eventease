import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
//import session from 'express-session'; // optional, but for completeness
import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true
}));
app.use(express.json());

// Passport
configurePassport(passport);
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(notFound);
app.use(errorHandler);