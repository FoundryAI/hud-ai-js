import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../Resource';
import { RequestManager } from '../RequestManager';

export interface Company {
    id: string;
    name: string;
    ticker: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanyKeyTerm {
    id: string;
    companyId: string;
    term: string;
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

export interface CompanyKeyTermListAttributes extends HudAiListAttributes {
    companyId: string;
    term?: string;
}

export interface CompanyKeyTermCreateAttributes extends HudAiCreateAttributes {
    companyId: string;
    term: string;
}

export interface CompanyKeyTermDestroyAttributes {
    companyId: string;
    term: string;
}

export class CompanyResource extends Resource<Company, CompanyListAttributes, CompanyCreateAttributes, CompanyUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/companies', requestManager);
    }

    public keyTerms(listArgs: CompanyKeyTermDestroyAttributes): Promise<CompanyKeyTerm[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}/{companyId}/key-terms`
        })
    }

    public createKeyTerm(createArgs: CompanyKeyTermCreateAttributes): Promise<CompanyKeyTerm> {
        return this.makeRequest({
            method: 'POST',
            params: createArgs,
            url: `${this.basePath}/{companyId}/key-terms`
        })
    }

    public removeKeyTerm(deleteArgs: CompanyKeyTermDestroyAttributes): Promise<CompanyKeyTerm> {
        return this.makeRequest({
            method: 'POST',
            params: deleteArgs,
            url: `${this.basePath}/{companyId}/key-terms`
        })
    }
}
