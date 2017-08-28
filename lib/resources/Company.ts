import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import {Session} from '../Session';
import * as Promise from 'bluebird';

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

    constructor(apiSession: Session, requestManager: RequestManager) {
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
