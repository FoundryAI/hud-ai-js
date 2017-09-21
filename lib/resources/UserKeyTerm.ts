import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserKeyTerm {
    id: string;
    userId: string;
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserKeyTermGetAttributes {
    userId: string;
    term: string;
}

export interface UserKeyTermListAttributes extends HudAiListAttributes {
    userId: string;
    term?: string;
}

export interface UserKeyTermCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    term: string;
}

export interface UserKeyTermDestroyAttributes {
    userId: string;
    term: string;
}

export class UserKeyTermResource extends Resource<
    UserKeyTerm,
    UserKeyTermListAttributes,
    UserKeyTermCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/{userId}/key-terms', requestManager);
    }

    public get(getArgs: UserKeyTermGetAttributes): Promise<UserKeyTerm> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{term}`
        })
    }

    public list(listArgs: UserKeyTermListAttributes): Promise<UserKeyTerm[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserKeyTermCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            params: _.pick(createArgs, 'userId'),
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: UserKeyTermDestroyAttributes) {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserKeyTermDestroyAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{term}`
        })
    }
}
