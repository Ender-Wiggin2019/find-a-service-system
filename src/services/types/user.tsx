export type Role = 'admin' | 'serviceProvider' | 'customer' | 'anonymous' | 'nonVerifiedProvider'

export enum ServiceProviderStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    NEED_TO_VERIFY = 'need to verify',
    REMOVED = 'removed',
}

export class User {
    constructor(public uid: string, public displayName: string, public email: string, public role: Role) {}
}

export class ServiceProvider extends User {
    constructor(
        uid: string,
        public displayName: string,
        email: string,
        public address: string | undefined,
        public description: string | undefined,
        public status: ServiceProviderStatus,
        public rejectReason?: string | undefined,
        public latitude = 0,

        public longitude = 0,
        public rating = 0,
        public commentCount = 0,
    ) {
        super(uid, displayName, email, 'serviceProvider')
    }
}

export class Customer extends User {
    constructor(uid: string, public displayName: string, email: string) {
        super(uid, displayName, email, 'customer')
    }
}

export class Admin extends User {
    constructor(uid: string, public displayName: string, email: string) {
        super(uid, displayName, email, 'admin')
    }
}
