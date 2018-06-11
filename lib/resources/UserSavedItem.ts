import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserSavedItem } from '../entities';

export interface UserSavedItemListAttributes extends HudAiListAttributes {
    contentType?: 'article' | 'quote' | 'tweet' | 'stockAlert' | 'earningsCall' | 'conferencePerson';
    contentId?: string;
    userId?: string;
}

export interface UserSavedItemCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    contentType: 'article' | 'quote' | 'tweet' | 'stockAlert' | 'earningsCall' | 'conferencePerson';
    contentId: string;
}

export class UserSavedItemResource extends Resource<
    UserSavedItem,
    UserSavedItemListAttributes,
    UserSavedItemCreateAttributes,
    HudAiUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/users/saved-items', requestManager);
    }

    public list(listArgs: UserSavedItemListAttributes): Promise<{ count: number, rows: UserSavedItem[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: UserSavedItemCreateAttributes): Promise<UserSavedItem> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<UserSavedItem> {
        return this._get(id);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
