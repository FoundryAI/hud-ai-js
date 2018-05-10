import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import {ConferenceLocation} from '../entities/ConferenceLocation';



export interface ConferenceLocationListAttributes extends HudAiListAttributes {
    name?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    conferenceId?: string;
}

export interface ConferenceLocationCreateAttributes extends HudAiCreateAttributes {
    name?: string;
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    zip: string;
    country: string;
    conferenceId: string;
}

export interface ConferenceLocationUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    line1?: string;
    line2?: string | null;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    conferenceId?: string;
}

export class ConferenceLocationResource extends Resource<ConferenceLocation, ConferenceLocationListAttributes, ConferenceLocationCreateAttributes, ConferenceLocationUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/conferences/locations', requestManager);
    }

    public list(listArgs: ConferenceLocationListAttributes): Promise<{ count: number, rows: ConferenceLocation[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: ConferenceLocationCreateAttributes): Promise<ConferenceLocation> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<ConferenceLocation> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: ConferenceLocationUpdateAttributes): Promise<ConferenceLocation> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
