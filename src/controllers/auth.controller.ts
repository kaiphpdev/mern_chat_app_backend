import {Response, Request} from 'express'
import { asyncHandler } from '../middlewares/asyncHandle.middleware'
import { loginSchema, registerSchema } from '../validators/auth.validators'
import { loginService, registerService } from '../services/auth.service'
import { clearJWTAuthCookie, setJWTAuthCookie } from '../utils/cookie'
import { HTTP_STATUS } from '../config/http.config'



export const registerController = asyncHandler(
    async(req:Request, res:Response)=>{
        
        const body = registerSchema.parse(req.body);
        const user = await registerService(body);
        const userId = user._id as string;

        return setJWTAuthCookie({
            res,
            userId,
            })
        .status(HTTP_STATUS.CREATED)
        .json({
            message: "User created & login successfully",
            user,
        });
    }
)



export const loginController = asyncHandler(
    async(req:Request, res:Response)=>{
        
        const body = loginSchema.parse(req.body);
        const user = await loginService(body);
        const userId = user._id as string;

        return setJWTAuthCookie({
            res,
            userId,
            })
        .status(HTTP_STATUS.CREATED)
        .json({
            message: "User login successfully",
            user,
        });
    }
)


export const logoutController = asyncHandler(
    async(req: Request, res: Response) => {
        return clearJWTAuthCookie(res)
        .status(HTTP_STATUS.CREATED)
        .json({
            message: "User logout successfully"
        });
    }
)


export const authStatusController = asyncHandler(
    async(req: Request, res: Response) => {
        const user = req.user; 
        // const user = req.user; 
        return res.status(HTTP_STATUS.OK).json({
            message: "Authenticated User",
            user
        })
    }
)