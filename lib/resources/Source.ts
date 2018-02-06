import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface Source {
    id: string;
    name: string;
    description: string;
    domain: string;
    language: string;
    country: string;
    reliabilityScore: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SourceListAttributes extends HudAiListAttributes {
    name?: string;
    domain?: string;
    minReliability?: number;
    maxReliability?: number;
    articleId?: string;
}

export interface SourceCreateAttributes extends HudAiCreateAttributes {
    name: string;
    domain: string;
    description?: string;
    language?: string;
    country?: string;
    reliabilityScore?: string;
}

export interface SourceUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    domain?: string;
    description?: string;
    language?: string;
    country?: string;
    reliabilityScore?: string;
}

export class SourceResource extends Resource<
    Source,
    SourceListAttributes,
    SourceCreateAttributes,
    SourceUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/articles/sources', requestManager);
    }

    public list(listArgs: SourceListAttributes): Promise<{ count: number, rows: Source[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: SourceCreateAttributes): Promise<Source> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Source> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: SourceUpdateAttributes): Promise<Source> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
