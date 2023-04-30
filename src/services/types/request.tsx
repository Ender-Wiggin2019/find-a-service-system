import { Service } from './service'
export enum ServiceStatus {
    REQUESTED = 'requested',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    NEED_MORE_INFO = 'need more info',
    COMPLETED = 'completed',
    FINISHED_COMMENT = 'finished comment',
}
export class RequestCreator {
    constructor(
        public sid: string, // service.id
        public uid: string, // user.id
        public requestCategory: string,
        public requiredHours: number,
        public address: string,
        public requestDescription: string,
        public requestedTime: Date,
        public timestamp: Date,
        public status: ServiceStatus = ServiceStatus.REQUESTED,
        public completeCheck?: number,
    ) {}
}

export interface IRequest {
    id: string // pk
    request: RequestCreator
    service: Service
}
