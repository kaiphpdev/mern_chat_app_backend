import { Router } from "express";
import authRoutes from "./auth.route";
import chatRoutes from "./chat.route";
import userRoutes from "./message.route";

const router = Router();


// Auth
router.use('/auth', authRoutes);
// Chat
router.use('/chat', chatRoutes);
// User
router.use('/user', userRoutes);


export default router;
