import {RequestCreator} from "~/services/types/request";

export enum MessageStatus {
    UNREAD = 'unread',
    READ = 'read',
    DELETE = 'delete',
}

export interface Message {
    body: string,
    time: Date,
    status: MessageStatus,
    link?: string,
}

export interface IMessage {
    id: string // pk
    message: Message
}

export function createWaitingForCommentMessage(request: RequestCreator): Message {
    const body = `Your request for ${request.requestCategory} has completed. What do you think about it?`
    return {
        body: body,
        time: new Date(),
        status: MessageStatus.UNREAD,
        link: '/customer-home'
    }
}

export function createNewServiceMessage(serviceId: string, serviceName: string): Message {
    const body = `A service ${serviceName} is now available. Take a look!`
    return {
        body: body,
        time: new Date(),
        status: MessageStatus.UNREAD,
        link: `/service/${serviceId}`
    }
}

