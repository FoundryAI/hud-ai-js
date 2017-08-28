import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import {Session} from '../Session';
import * as Promise from 'bluebird';

export interface KeyTermListAttributes extends HudAiListAttributes {
    term?: string;
}

export interface KeyTermCreateAttributes extends HudAiCreateAttributes {
    term: string;
}

export class KeyTermResource extends Resource {

    constructor(apiSession: Session, requestManager: RequestManager) {
        super('/key-terms', apiSession, requestManager);
    }

    public get(id: string) {
        return super.get(id);
    }

    public list(params: KeyTermListAttributes) {
        return super.list(params);
    }

    public create(params: KeyTermCreateAttributes) {
        return super.create(params);
    }

    public del(id: string) {
        return super.del(id);
    }
}
