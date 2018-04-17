import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { Industry } from '../entities';

export interface IndustryListAttributes extends HudAiListAttributes {
    name?: string;
    textCorpus?: string;
}

export interface IndustryCreateAttributes extends HudAiCreateAttributes {
    name: string;
    textCorpus?: string;
}

export interface IndustryUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    textCorpus?: string;
}

export class IndustryResource extends Resource<
    Industry,
    IndustryListAttributes,
    IndustryCreateAttributes,
    IndustryUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/companies/industries', requestManager);
    }

    public list(listArgs: IndustryListAttributes): Promise<{ count: number, rows: Industry[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: IndustryCreateAttributes): Promise<Industry> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Industry> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: IndustryUpdateAttributes): Promise<Industry> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
