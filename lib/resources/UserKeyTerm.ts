import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import {BasicKeyTerm} from './KeyTerm';

export interface UserKeyTerm extends BasicKeyTerm {
    id: string;
    userId?: string;
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserKeyTermGetAttributes {
    userId?: string;
    term: string;
}

export interface UserKeyTermListAttributes extends HudAiListAttributes {
    userId?: string;
    term?: string;
}

export interface UserKeyTermCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    term: string;
}

export interface UserKeyTermDestroyAttributes {
    userId?: string;
    term: string;
}

export class UserKeyTermResource extends Resource<
    UserKeyTerm,
    UserKeyTermListAttributes,
    UserKeyTermCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/key-terms', requestManager);
    }

    public list(listArgs: UserKeyTermListAttributes): Promise<{ count: number, rows: UserKeyTerm[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserKeyTermCreateAttributes): Promise<UserKeyTerm> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: UserKeyTermGetAttributes): Promise<UserKeyTerm> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{term}`
        })
    }

    public del(destroyArgs: UserKeyTermDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserKeyTermDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: _.pick(destroyArgs, ['userId', 'term']),
            url: `${this.basePath}/{term}`
        })
    }
}
