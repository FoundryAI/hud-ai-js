import {HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource} from '../Resource';
import {RequestManager} from '../RequestManager';
import * as Promise from 'bluebird';

export interface Domain {
    companyId: string;
    hostname: string;
}

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

export class DomainResource extends Resource<Domain, DomainListAttributes, DomainCreateAttributes, DomainUpdateAttributes> {

    constructor(requestManager: RequestManager) {
        super('/domains', requestManager);
    }
}
