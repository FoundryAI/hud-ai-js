import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes, HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserSource {
    id: string;
    userId: string;
    reliabilityScore: number;
    sourceId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSourceListAttributes extends HudAiListAttributes {
    userId?: string;
    sourceId?: string;
}

export interface UserSourceCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    sourceId: string;
    reliabilityScore: number;
}

export interface UserSourceUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    sourceId: string;
    reliabilityScore: number;
}

export interface UserSourceDestroyAttributes {
    userId?: string;
    sourceId: string;
}

export class UserSourceResource extends Resource<
    UserSource,
    UserSourceListAttributes,
    UserSourceCreateAttributes,
    UserSourceUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/articles/sources/users', requestManager);
    }

    public list(listArgs: UserSourceListAttributes): Promise<{ count: number, rows: UserSource[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserSourceCreateAttributes): Promise<UserSource> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public update(createArgs: UserSourceUpdateAttributes): Promise<UserSource> {
        return this.makeRequest({
            method: 'PUT',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: UserSourceDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserSourceDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}
        })
    }
}
