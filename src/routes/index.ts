import { Router } from "express";
import authRoutes from "./auth.route";

const router = Router();

// Auth
router.use('auth', authRoutes);

// Chat

// User


export default router;
