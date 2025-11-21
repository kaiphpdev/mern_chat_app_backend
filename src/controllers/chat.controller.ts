import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandle.middleware";
import { HTTP_STATUS } from "../config/http.config";
import { chatIdSchema, createChatSchema } from "../validators/chat.validators";
import { createChatService, getSingleChatService, getUserChatsService } from "../services/chat.service";

export const createChatController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;

        const body = createChatSchema.parse(req.body);

        const chat = await createChatService(userId, body);
        
        return res.status(HTTP_STATUS.OK).json({
            "message":"Chat create or retrieved successfully!",
            chat
        })
    }
)

export const getUserChatsController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;

        const chat = await getUserChatsService(userId);
        
        return res.status(HTTP_STATUS.OK).json({
            "message":"Chat create or retrieved successfully!",
            chat
        })
    }
)

export const getSingleChatController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;
        const { id } = chatIdSchema.parse(req.params);


        const { chat, messages } = await getSingleChatService(id, userId);
        
        return res.status(HTTP_STATUS.OK).json({
            "message":"Chat create or retrieved successfully!",
            chat, messages
        })
    }
)