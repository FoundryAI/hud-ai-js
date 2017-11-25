import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserPerson {
    id: string;
    userId?: string;
    personId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPersonGetAttributes {
    userId?: string;
    personId: string;
}

export interface UserPersonListAttributes extends HudAiListAttributes {
    userId?: string;
    personId?: string;
}

export interface UserPersonCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    personId: string;
}

export interface UserPersonDestroyAttributes {
    userId?: string;
    personId: string;
}

export class UserPersonResource extends Resource<
    UserPerson,
    UserPersonListAttributes,
    UserPersonCreateAttributes,
    any
    > {
    constructor(requestManager: RequestManager) {
        super('/users/people', requestManager);
    }

    public list(listArgs: UserPersonListAttributes): Promise<{ count: number, rows: UserPerson[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserPersonCreateAttributes): Promise<UserPerson> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: UserPersonGetAttributes): Promise<UserPerson> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{personId}`
        })
    }

    public del(destroyArgs: UserPersonDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserPersonDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{personId}`
        })
    }
}
