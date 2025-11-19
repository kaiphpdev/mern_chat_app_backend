import ChatModel from "../models/chat.model";
import MessageModel from "../models/message.model";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";


export const createChatService = async (
    userId: string,
    body: {
        participantId?: string;
        isGroup?: boolean | string;
        participants?: string[];
        groupName?: string;
    }
) => {
    const {
        participantId,
        isGroup,
        participants,
        groupName,
    } = body;
    let chat;
    let allParticipantIds: string[] = [];
    if (isGroup && participants?.length && groupName) {
        allParticipantIds = [userId, ...participants]
        chat = ChatModel.create({
            participants: allParticipantIds,
            isGroup: true,
            groupName: groupName,
            createdBy: userId
        })
    } else if (participantId) {
        const otherUser = await UserModel.findById(participantId);
        if (!otherUser) throw new NotFoundException("User not found!")

        allParticipantIds = [userId, participantId]
        const existingChat = await ChatModel.findOne({
            participants: {
                $all: allParticipantIds, $size: 2,
            }
        }).populate("participants", "name avatar");
        // .populate("participants")

        if (existingChat) return existingChat;

        chat = await ChatModel.create({
            participants: allParticipantIds,
            isGroup: false,
            createdBy: userId,
        })
    }
    //  Implement WebSocket

    return chat;

}


export const getUserChatsService = async (userId: string) => {
    const chat = await ChatModel.find({
        participants: {
            $in: [userId],
        }
    }).populate("participants", "name avatar").populate({ path: "lastMessage", populate: { path: "sender", select: "name avatar" } }).sort({ updatedAt: -1 });

    return chat;

} 


export const getSingleChatService = async(chatId: string, userId: string) => {

    const chat = await ChatModel.findOne({
        _id: chatId,
        participants: {
            $in: [userId]
        }
    })

    if(!chat){
        throw new BadRequestException(
            "Chat not fount or you are not authorized to view  tp this chat"
        )
    }

    const message = await MessageModel.find({chatId})
                    .populate("sender", "name avatar")
                    .populate({
                        path: "reply",
                        select: "name avatar"
                    })

    return 
}