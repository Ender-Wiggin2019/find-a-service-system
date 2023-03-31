export type Role = "admin" | "serviceProvider" | "customer" | "anonymous";

export class User {
    constructor(
        public uid: string,
        public displayName: string,
        public email: string,
        public role: Role
    ) {}
}

export class ServiceProvider extends User {
    constructor(
        uid: string,
        public displayName: string,
        email: string,
        public address: string | undefined,
        public description: string | undefined,
    ) {
        super(uid, displayName, email, "serviceProvider");
    }
}

export class Customer extends User {
    constructor(
        uid: string,
        public displayName: string,
        email: string,
    ) {
        super(uid, displayName, email, "customer");
    }
}

