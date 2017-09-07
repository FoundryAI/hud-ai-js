import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import * as Promise from 'bluebird';
import {RequestManager} from '../RequestManager';

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

export class TextCorpusResource extends Resource<TextCorpus, TextCorpusListAttributes, TextCorpusCreateAttributes, TextCorpusUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/text-corpora', requestManager);
    }
}
