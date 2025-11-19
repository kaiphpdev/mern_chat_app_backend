import cookieParser from 'cookie-parser';
import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from "cors";
import passport from 'passport'

import { Env } from './config/env.config';
import { asyncHandler } from './middlewares/asyncHandle.middleware';
import { HTTP_STATUS } from './config/http.config';
import { errorHandler } from './middlewares/errorHandle.middleware';
import connectionDatabase from './config/database.config';
import './config/passport.config'
import router from './routes';

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:Env.FRONTEND_ORIGIN,
        credentials: true,
    })
)


app.use(passport.initialize());

app.get("/", asyncHandler(async (req: Request, res: Response)=>{
    res.status(HTTP_STATUS.OK).json({
        message:"Server is ready!",
        status:"ok",
    })
}))


app.use('/api', router)
app.use(errorHandler);


app.listen(Env.PORT, async ()=>{
    await connectionDatabase();
    console.log(`Server is running on port ${Env.PORT} and on ${Env.NODE_ENV} mode! `)
})