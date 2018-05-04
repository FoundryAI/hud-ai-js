import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { ActionItem } from '../entities';

export interface ActionItemListAttributes extends HudAiListAttributes {
    createdAfter?: Date;
    createdBefore?: Date;
    id?: string;
    userId?: string;
    companyIds?: string | string[];
    personIds?: string | string[];
}

export interface ActionItemCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    actionType: 'call' | 'email';
    associatedEntityType: 'company' | 'person';
    associatedEntityId: string;
    completedAt?: Date;
    dismissedAt?: Date;
    propensityScore?: number;
    contentItems?: {
        contentType: 'article' | 'quote' | 'tweet' | 'stockAlert',
        contentId: string,
    }[];
}

export interface ActionItemUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    actionType?: 'call' | 'email';
    associatedEntityType?: 'company' | 'person';
    associatedEntityId?: string;
    completedAt?: Date;
    dismissedAt?: Date;
    propensityScore?: number;
}

export class ActionItemResource extends Resource<
    ActionItem,
    ActionItemListAttributes,
    ActionItemCreateAttributes,
    ActionItemUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/users/action-items', requestManager);
    }

    public list(listArgs: ActionItemListAttributes): Promise<{ count: number, rows: ActionItem[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: ActionItemCreateAttributes): Promise<ActionItem> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<ActionItem> {
        return this._get(id);
    }

    public update(id: string, updateArgs: ActionItemUpdateAttributes): Promise<ActionItem> {
        return this._update(id, updateArgs);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
