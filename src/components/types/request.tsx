import { Service } from "./service";
export enum ServiceStatus {
    REQUESTED = "requested",
    ACCEPTED = "accepted",
    DECLINED = "declined",
    COMPLETED = "completed",
}
export class RequestCreator {
    constructor(
        public sid: string, // service.id
        public uid: string, // user.id
        public requestDescription: string,
        public requestedTime: Date,
        public timestamp: Date,
        public status: ServiceStatus = ServiceStatus.REQUESTED,
    ) {}
}


export interface IRequest {
    id: string; // pk
    request: RequestCreator;
    service: Service;
}

