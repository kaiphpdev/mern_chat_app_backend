import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { getUserController } from "../controllers/user.controller";

const userRoutes = Router().use(passportAuthenticateJwt);
userRoutes.get('/all', getUserController);
// userRoutes.get('/:id', getUserController);


export default userRoutes