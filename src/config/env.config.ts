import { getEnv } from "../utils/get-env";

export  const Env = {
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "4300"),
    MONGO_URI: getEnv("MONGO_URI", "MONGO_URI="),
    JWT_SECRET: getEnv("JWT_SECRET", "jwt_secret"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "7d"),
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),


    // Cloudinary
    CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME", ""),
    CLOUDINARY_API_KEY: getEnv("CLOUDINARY_API_KEY", ""),
    CLOUDINARY_API_SECRET: getEnv("CLOUDINARY_API_SECRET", ""),


} as const;