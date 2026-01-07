import cloudinary from "../config/cloudinary.config";
import ChatModel from "../models/chat.model";
import MessageModel from "../models/message.model";
import { BadRequestException } from "../utils/app-error";


export const sendMessageService = async (
    userId: string,
    body: {
        chatId: string,
        content?: string,
        image?: string,
        replyToId?: string
    }
) => {
    const {
        chatId,
        content,
        image,
        replyToId,
    } = body;
    const chat = await ChatModel.findOne({
        _id: chatId,
        participants: {
            $in: [userId],
        }
    });

    if (!chat) throw new BadRequestException('Chat not found or unauthorized');

    if (replyToId) {
        const replyMessage = await MessageModel.findOne({
            _id: replyToId,
            chatId
        });
        if (!replyMessage) throw new BadRequestException('Reply messages not found');
    }

        let imageUrl;

        if (image) {
            // Upload the image tp cloudinary
            const uploadRes = await cloudinary.uploader.upload(image)
            imageUrl = uploadRes.secure_url;
        }


        const newMessage = await MessageModel.create({
            chatId,
            sender: userId,
            content,
            image: imageUrl,
            replyTo: replyToId || null
        })
        await newMessage.populate([
            { path: "sender", select: "name avatar" },
            { path: "replyTo", select: "content image sender", populate: { path: "sender", select: "name avatar" } },
        ]);
    // Websocket

    return {
        userMessage: newMessage,
        chat
    }
}