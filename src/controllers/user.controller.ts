import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandle.middleware";
import { HTTP_STATUS } from "../config/http.config";
import { getUserService } from "../services/user.service";

export const getUserController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id

        const users = await getUserService(userId);
        
        return res.status(HTTP_STATUS.OK).json({
            "message":"Users retrieved successfully!",
            users
        })
    }
)