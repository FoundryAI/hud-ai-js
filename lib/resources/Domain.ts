import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {BasicSession} from '../sessions/BasicSession';
import {PersistentSession} from '../sessions/PersistentSession';
import {RequestManager} from '../RequestManager';

export interface DomainListAttributes extends HudAiListAttributes {
    companyId?: string;
    hostname?: string;
}

export interface DomainCreateAttributes extends HudAiCreateAttributes {
    companyId: string;
    hostname: string;
}

export interface DomainUpdateAttributes extends HudAiUpdateAttributes {
    companyId?: string;
    hostname?: string;
}

export class DomainResource extends Resource {

    constructor(apiSession: BasicSession|PersistentSession, requestManager: RequestManager) {
        super('/domains', apiSession, requestManager);
    }

    public get(id: string) {
        return super.get(id);
    }

    public list(params: DomainListAttributes) {
        return super.list(params);
    }

    public create(params: DomainCreateAttributes) {
        return super.create(params);
    }

    public update(id: string, params: DomainUpdateAttributes) {
        return super.update(id, params);
    }

    public del(id: string) {
        return super.del(id);
    }
}