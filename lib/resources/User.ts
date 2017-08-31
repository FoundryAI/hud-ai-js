import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import {Session} from '../Session';
import * as Promise from 'bluebird';

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
}

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

export class UserResource extends Resource<User, UserListAttributes, UserCreateAttributes, UserUpdateAttributes> {
    constructor(apiSession: Session, requestManager: RequestManager) {
        super('/users', apiSession, requestManager);
    }
}
