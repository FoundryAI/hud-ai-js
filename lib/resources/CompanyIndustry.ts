import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { CompanyIndustry } from '../entities';

export interface CompanyIndustryGetAttributes {
    companyId: string;
    industryId: string;
}

export interface CompanyIndustryListAttributes extends HudAiListAttributes {
    companyId: string;
    industryId?: string;
}

export interface CompanyIndustryCreateAttributes extends HudAiCreateAttributes {
    companyId: string;
    industryId: string;
}

export interface CompanyIndustryDestroyAttributes {
    companyId: string;
    industryId: string;
}

export class CompanyIndustryResource extends Resource<
    CompanyIndustry,
    CompanyIndustryListAttributes,
    CompanyIndustryCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/companies/{companyId}/industries', requestManager);
    }

    public list(listArgs: CompanyIndustryListAttributes): Promise<{ count: number, rows: CompanyIndustry[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: CompanyIndustryCreateAttributes): Promise<CompanyIndustry> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: CompanyIndustryGetAttributes): Promise<CompanyIndustry> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{industryId}`
        })
    }

    public del(destroyArgs: CompanyIndustryDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: CompanyIndustryDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{industryId}`
        })
    }
}
