import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserContentItemReaction } from '../entities';

export interface UserContentItemReactionListAttributes extends HudAiListAttributes {
    contentType?: 'article' | 'quote' | 'tweet' | 'stockAlert' | 'video' | 'earningsCall' | 'conferencePerson';
    contentId?: string;
    userId?: string;
    reaction?: 'relevant' | 'not_relevant';
}

export interface UserContentItemReactionCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    contentType: 'article' | 'quote' | 'tweet' | 'stockAlert' | 'video' | 'earningsCall' | 'conferencePerson';
    contentId: string;
    reaction: 'relevant' | 'not_relevant';
}

export class UserContentItemReactionResource extends Resource<
    UserContentItemReaction,
    UserContentItemReactionListAttributes,
    UserContentItemReactionCreateAttributes,
    HudAiUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/users/reactions', requestManager);
    }

    public list(listArgs: UserContentItemReactionListAttributes): Promise<{ count: number, rows: UserContentItemReaction[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: UserContentItemReactionCreateAttributes): Promise<UserContentItemReaction> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<UserContentItemReaction> {
        return this._get(id);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
