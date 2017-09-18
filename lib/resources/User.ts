import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

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
    constructor(requestManager: RequestManager) {
        super('/users', requestManager);
    }

    public get(id: string | number): Promise<User> {
        return this._get(id);
    }

    public list(listArgs: UserListAttributes): Promise<User[]> {
        return this._list(listArgs);
    }

    public update(id: string | number, updateArgs: UserUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: UserCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this._del(id);
    }
}
