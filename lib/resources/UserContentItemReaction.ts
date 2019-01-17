import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserContentItemReaction } from '../entities';

export enum ContentItemReaction {
    relevant = 'relevant',
    notRelevant = 'not_relevant',
}

export enum ContentItemReactionType {
    article = 'article',
    quote = 'quote',
    tweet = 'tweet',
    stockAlert = 'stockAlert',
    video = 'video',
    earningsCall = 'earningsCall',
    conferencePerson = 'conferencePerson',
}

export interface UserContentItemReactionListAttributes extends HudAiListAttributes {
    contentType?: ContentItemReactionType;
    contentId?: string;
    userId?: string;
    reaction?: ContentItemReaction;
}

export interface UserContentItemReactionCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    contentType: ContentItemReactionType;
    contentId: string;
    reaction: ContentItemReaction;
}

export interface UserContentItemReactionUpdateAttributes extends HudAiUpdateAttributes {
	contentType: ContentItemReactionType;
	contentId: string;
	reaction: ContentItemReaction;
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

	public update(id: string, updateArgs: UserContentItemReactionUpdateAttributes): Promise<UserContentItemReaction> {
		return this._update(id, updateArgs);
	}

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
