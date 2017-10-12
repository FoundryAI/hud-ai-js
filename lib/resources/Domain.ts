import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

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

export class DomainResource extends Resource<
    Domain,
    DomainListAttributes,
    DomainCreateAttributes,
    DomainUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/companies/domains', requestManager);
    }

    public list(listArgs: DomainListAttributes): Promise<{ count: number, rows: Domain[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: DomainCreateAttributes): Promise<Domain> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Domain> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: DomainUpdateAttributes): Promise<Domain> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
