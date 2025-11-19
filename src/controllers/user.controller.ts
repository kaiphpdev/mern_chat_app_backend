import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandle.middleware";

export const getUserController = asyncHandler(
    async (req: Request, res: Response) => {
        
    }
)