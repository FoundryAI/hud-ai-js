import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {BasicSession} from '../sessions/BasicSession';
import {PersistentSession} from '../sessions/PersistentSession';
import {RequestManager} from '../RequestManager';

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

export class TextCorpusResource extends Resource {

    constructor(apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
        super('/text-corpora', apiSession, requestManager);
    }

    public get(id: string) {
        return super.get(id);
    }

    public list(params: TextCorpusListAttributes) {
        return super.list(params);
    }

    public create(params: TextCorpusCreateAttributes) {
        return super.create(params);
    }

    public update(id: string, params: TextCorpusUpdateAttributes) {
        return super.update(id, params);
    }

    public del(id: string) {
        return super.del(id);
    }
}