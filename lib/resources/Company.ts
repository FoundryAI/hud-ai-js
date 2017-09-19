import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface Company {
    id: string;
    name: string;
    ticker: string;
    createdAt: Date;
    updatedAt: Date;
}

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

export class CompanyResource extends Resource<
    Company,
    CompanyListAttributes,
    CompanyCreateAttributes,
    CompanyUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/companies', requestManager);
    }

    public get(id: string | number): Promise<Company> {
        return this._get(id);
    }

    public list(listArgs: CompanyListAttributes): Promise<Company[]> {
        return this._list(listArgs);
    }

    public update(id: string | number, updateArgs: CompanyUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: CompanyCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this.destroy(id);
    }

    public destroy(id: string | number) {
        return this._destroy(id);
    }
}
