import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { User } from '../entities';

export interface UserListAttributes extends HudAiListAttributes {
    name?: string;
    email?: string;
    digestSubscriptionDay?: string;
    digestSubscriptionHour?: string;
    keyTerm?: string;
    organizationId?: string;
}

export interface UserCreateAttributes extends HudAiCreateAttributes {
    name: string;
    email: string;
    phone?: string;
    timezone?: string;
    linkedinProfileId?: string | null;
    salesforceProfileId?: string | null;
    organizationId?: string | null;
    showLocal?: boolean;
}

export interface UserUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    email?: string;
    phone?: string;
    timezone?: string;
    linkedinProfileId?: string | null;
    salesforceProfileId?: string | null;
    organizationId?: string | null;
    isEmailVerified?: boolean;
    showLocal?: boolean;
}

export class UserResource extends Resource<User, UserListAttributes, UserCreateAttributes, UserUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/users', requestManager);
    }

    public list(listArgs: UserListAttributes): Promise<{ count: number, rows: User[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: UserCreateAttributes): Promise<User> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<User> {
        return this._get(id);
    }

    public me(): Promise<User> {
        return this.makeRequest({
            method: 'GET',
            url: `${this.basePath}/me`
        })
    }

    public update(id: string | number, updateArgs: UserUpdateAttributes): Promise<User> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
