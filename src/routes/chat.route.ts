import { Router } from "express";
import { createChatController, getSingleChatController, getUserChatsController } from "../controllers/chat.controller";
import { passportAuthenticateJwt } from "../config/passport.config";

const chatRoutes = Router().use(passportAuthenticateJwt);

chatRoutes.post('/create', createChatController);
chatRoutes.get('/all', getUserChatsController);
chatRoutes.get('/:id', getSingleChatController);


export default chatRoutes