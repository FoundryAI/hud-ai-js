import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import * as Promise from 'bluebird';

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

export class KeyTermResource extends Resource<KeyTerm, KeyTermListAttributes, KeyTermCreateAttributes, HudAiUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/key-terms', requestManager);
    }
}
