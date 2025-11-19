import UserModel from "../models/user.model"

export const findByIdUserService = async(userId: string) => {
    return await UserModel.findById(userId)
}

export const getUserService = async(userId: string) => {
    const users = await UserModel.find({
        _id:{ $ne: userId }
    }).select('-password')
    
    return users;

    // return await UserModel.findById(userId)
}