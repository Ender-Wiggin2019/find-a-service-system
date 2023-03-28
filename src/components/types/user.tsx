export type Role = "admin" | "service_provider" | "user" | "anonymous";

export class User {
    constructor(
        public uid: string,
        public email: string,
        public role: Role
    ) {}
}

export class ServiceProvider extends User {
    constructor(
        uid: string,
        email: string,
        public address: string,
        public description: string
    ) {
        super(uid, email, "service_provider");
    }
}

