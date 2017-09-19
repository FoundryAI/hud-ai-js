import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface TextCorpus {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    userId: string;
    body: string;
}

export interface TextCorpusListAttributes extends HudAiListAttributes {
    type?: string;
    userId?: string;
}

export interface TextCorpusCreateAttributes extends HudAiCreateAttributes {
    type: string;
    body: string;
    userId: string;
}

export interface TextCorpusUpdateAttributes extends HudAiUpdateAttributes {
    type?: string;
    body?: string;
    userId?: string;
}

export class TextCorpusResource extends Resource<
    TextCorpus,
    TextCorpusListAttributes,
    TextCorpusCreateAttributes,
    TextCorpusUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/text-corpora', requestManager);
    }

    public get(id: string | number): Promise<TextCorpus> {
        return this._get(id);
    }

    public list(listArgs: TextCorpusListAttributes): Promise<TextCorpus[]> {
        return this._list(listArgs);
    }

    public update(id: string | number, updateArgs: TextCorpusUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: TextCorpusCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this.destroy(id);
    }

    public destroy(id: string | number) {
        return this._destroy(id);
    }
}
