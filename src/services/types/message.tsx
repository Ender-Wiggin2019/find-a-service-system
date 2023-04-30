import {RequestCreator} from "~/services/types/request";

export interface Message {
    body: string,
    time: Date,
    link?: string,
}

export function createWaitingForCommentMessage(request: RequestCreator): Message {
    const body = `Your request for ${request.requestCategory} has completed. What do you think about it?`
    return {
        body: body,
        time: new Date(),
        link: '/'
    }
}

export function createNewServiceMessage(serviceId: string, serviceName: string): Message {
    const body = `A service ${serviceName} is now available. Take a look!`
    return {
        body: body,
        time: new Date(),
        link: `/service/${serviceId}`
    }
}

