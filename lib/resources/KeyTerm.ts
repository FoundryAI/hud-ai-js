import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface KeyTerm {
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface KeyTermListAttributes extends HudAiListAttributes {
    term?: string;
}

export interface KeyTermCreateAttributes extends HudAiCreateAttributes {
    term: string;
}

export class KeyTermResource extends Resource<
    KeyTerm,
    KeyTermListAttributes,
    KeyTermCreateAttributes,
    HudAiUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/key-terms', requestManager);
    }

    public list(listArgs: KeyTermListAttributes): Promise<{ count: number, rows: KeyTerm[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: KeyTermCreateAttributes): Promise<KeyTerm> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<KeyTerm> {
        return this._get(id);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
