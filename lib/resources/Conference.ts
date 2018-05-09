import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { Conference } from '../entities';

export interface ConferenceListAttributes extends HudAiListAttributes {
    name?: string;
    personId?: string;
    after?: Date;
    before?: Date;
}

export interface ConferenceListResults {
    count: number,
    rows: Conference[]
}

export interface ConferenceCreateAttributes extends HudAiCreateAttributes {
    name: string;
    description?: string;
    url?: string;
    timezone?: string;
}

export interface ConferenceUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    description?: string;
    url?: string;
    timezone?: string;
}

export class ConferenceResource extends Resource<
    Conference,
    ConferenceListAttributes,
    ConferenceCreateAttributes,
    ConferenceUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/people/conferences', requestManager);
    }

    public list(listArgs: ConferenceListAttributes): Promise<ConferenceListResults> {
        return this._list(listArgs);
    }

    public create(createArgs: ConferenceCreateAttributes): Promise<Conference> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Conference> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: ConferenceUpdateAttributes): Promise<Conference> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
