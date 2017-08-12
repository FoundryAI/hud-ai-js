import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {BasicSession} from '../sessions/BasicSession';
import {PersistentSession} from '../sessions/PersistentSession';
import {RequestManager} from '../RequestManager';

export interface KeyTermListAttributes extends HudAiListAttributes {
    term?: string;
}

export interface KeyTermCreateAttributes extends HudAiCreateAttributes {
    term: string;
}

export class KeyTermResource extends Resource {

    constructor(apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
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