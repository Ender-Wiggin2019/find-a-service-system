import { ServiceProvider } from "./user";

// ServiceCreator is the initial data of service
export class ServiceCreator {
    constructor(
        public uid: string, // connected to user.uid in firestore
        public name: string,
        public image: string,
        public price: string,
        public coverArea: string,
        public time: string,
        public description: string,
        public isVerified: boolean = false,
    ) {}
}

// service contains all data in service collection from firestore
export class Service extends ServiceCreator{
    constructor(
        public uid: string,
        public name: string,
        public image: string,
        public price: string,
        public coverArea: string,
        public time: string,
        public description: string,
        public isVerified: boolean = false,
        public comments?: Array<Comment>,
    ) {
        super(uid, name, image, price, coverArea, time, description, isVerified);
    }
}

export interface IService {
    id: string; // pk
    service: Service;
    serviceProvider: ServiceProvider;
}

export interface Comment {
    uid: string; // connected to user.uid in firestore
    name: string;
    time: Date;
    // title: string;
    comment: string;
    rating: number;
}

export interface IComment {
    serviceId: string;
    comment: Comment;
}
