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

    public get(id: string | number): Promise<KeyTerm> {
        return this._get(id);
    }

    public list(listArgs: KeyTermListAttributes): Promise<KeyTerm[]> {
        return this._list(listArgs);
    }

    public create(createArgs: KeyTermCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this.destroy(id);
    }

    public destroy(id: string | number) {
        return this._destroy(id);
    }
}
