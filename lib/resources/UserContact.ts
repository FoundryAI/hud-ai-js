import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserContact {
    id: string;
    userId: string;
    companyId: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserContactListAttributes extends HudAiListAttributes {
    userId?: string;
    companyId?: string;
}

export interface UserContactCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    companyId: string;
    name: string;
    email?: string;
    phoneNumber?: string;
}

export interface UserContactUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    companyId?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
}

export interface UserContactDestroyAttributes {
    userId?: string;
    id: string;
}

export class UserContactResource extends Resource<
    UserContact,
    UserContactListAttributes,
    UserContactCreateAttributes,
    UserContactUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/users/contacts', requestManager);
    }

    public get(id: string): Promise<UserContact> {
        return this._get(id);
    }

    public list(listArgs: UserContactListAttributes): Promise<UserContact[]> {
        return this._list(listArgs);
    }

    public update(id: string, updateArgs: UserContactUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: UserContactCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string) {
        return this.destroy(id);
    }

    public destroy(id: string) {
        return this._destroy(id);
    }
}
