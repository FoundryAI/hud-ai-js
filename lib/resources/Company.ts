import { HudAiCreateAttributes, HudAiListAttributes, HudAiUpdateAttributes, Resource } from '../Resource';
import { RequestManager } from '../RequestManager';
import * as Promise from 'bluebird';

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

export class CompanyResource extends Resource<Company, CompanyListAttributes, CompanyCreateAttributes, CompanyUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/companies', requestManager);
    }
}
