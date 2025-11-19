import { Env } from "../config/env.config";
import { Response } from "express";
import jwt from 'jsonwebtoken'


type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`
type Cookie = {
    res: Response;
    userId: string
}

export const setJWTAuthCookie = ({res, userId}: Cookie) => {
    const payload = { userId };
    const expiresIn = Env.JWT_EXPIRES_IN as Time
    const token = jwt.sign(payload, Env.JWT_SECRET, {
        audience: ["user"],
        expiresIn: (expiresIn || "7d")
    })

    const isProduction = (Env.NODE_ENV === "production");


    return res.cookie('accessToken', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProduction ? true : false,
        sameSite: isProduction ? "strict" : "lax" 
    })
};



export const clearJWTAuthCookie = (res:Response) =>  res.cookie('accessToken', { path: "/" })



 