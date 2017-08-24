import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import {Session} from '../Session';

export interface UserListAttributes extends HudAiListAttributes {
    name?: string;
    email?: string;
}

export interface UserCreateAttributes extends HudAiCreateAttributes {
    name: string;
    email: string;
    timeZone?: string;
}

export interface UserUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    email?: string;
    timeZone?: string;
}

export class UserResource extends Resource {

    constructor(apiSession: Session, requestManager: RequestManager) {
        super('/users', apiSession, requestManager);
    }

    public get(id: string) {
        return super.get(id);
    }

    public list(params: UserListAttributes) {
        return super.list(params);
    }

    public create(params: UserCreateAttributes) {
        return super.create(params);
    }

    public update(id: string, params: UserUpdateAttributes) {
        return super.update(id, params);
    }

    public del(id: string) {
        return super.del(id);
    }
}