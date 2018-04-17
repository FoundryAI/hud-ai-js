import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserContact } from '../entities';

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

    public list(listArgs: UserContactListAttributes): Promise<{ count: number, rows: UserContact[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: UserContactCreateAttributes): Promise<UserContact> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<UserContact> {
        return this._get(id);
    }

    public update(id: string, updateArgs: UserContactUpdateAttributes): Promise<UserContact> {
        return this._update(id, updateArgs);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
