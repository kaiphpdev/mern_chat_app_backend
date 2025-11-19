import mongoose from "mongoose"
import { Env } from "./env.config"

const connectionDatabase = async () => {
    try {
        await mongoose. connect(Env.MONGO_URI)
        console.log('Database connected!!!')
    } catch (error) {
        console.error('Database connected error!!!')
        process.exit(1);
    }
}

export default connectionDatabase;