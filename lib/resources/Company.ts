import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {BasicSession} from '../sessions/BasicSession';
import {PersistentSession} from '../sessions/PersistentSession';
import {RequestManager} from '../RequestManager';

export interface CompanyListAttributes extends HudAiListAttributes {
    id?: string;
    name?: string;
}

export interface CompanyCreateAttributes extends HudAiCreateAttributes {
    name: string;
}

export interface CompanyUpdateAttributes extends HudAiUpdateAttributes {
    name: string;
}

export class CompanyResource extends Resource {

    constructor(apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
        super('/companies', apiSession, requestManager);
    }

    public get(id: string) {
        return super.get(id);
    }

    public list(params: CompanyListAttributes) {
        return super.list(params);
    }

    public create(params: CompanyCreateAttributes) {
        return super.create(params);
    }

    public update(id: string, params: CompanyUpdateAttributes) {
        return super.update(id, params);
    }

    public del(id: string) {
        return super.del(id);
    }
}