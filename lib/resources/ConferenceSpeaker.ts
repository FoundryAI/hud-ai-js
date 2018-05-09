import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import {ConferenceSpeaker} from '../entities';

export interface ConferenceSpeakerListAttributes extends HudAiListAttributes {
    name?: string;
    personId?: string;
    after?: Date;
    before?: Date;
}

export interface ConferenceSpeakerListResults {
    count: number,
    rows: ConferenceSpeaker[]
}

export interface ConferenceSpeakerCreateAttributes extends HudAiCreateAttributes {
    personId: string;
    conferenceId: string;
}

export interface ConferenceSpeakerUpdateAttributes extends HudAiUpdateAttributes {
    personId: string;
    conferenceId: string;
}

export class ConferenceSpeakerResource extends Resource<
    ConferenceSpeaker,
    ConferenceSpeakerListAttributes,
    ConferenceSpeakerCreateAttributes,
    ConferenceSpeakerUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/people/conferences/speakers', requestManager);
    }

    public list(listArgs: ConferenceSpeakerListAttributes): Promise<ConferenceSpeakerListResults> {
        return this._list(listArgs);
    }

    public create(createArgs: ConferenceSpeakerCreateAttributes): Promise<ConferenceSpeaker> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<ConferenceSpeaker> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: ConferenceSpeakerUpdateAttributes): Promise<ConferenceSpeaker> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
