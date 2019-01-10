import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { CompanyProfile } from '../entities';

export interface CompanyProfileGetAttributes {
    companyId: string;
}

export interface CompanyProfileCreateAttributes extends HudAiCreateAttributes {
    description?: string;
    profileImageUrl?: string;
    homepageUrl?: string;
    linkedinUrl?: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface CompanyProfileUpdateAttributes extends HudAiUpdateAttributes {
    description?: string;
    profileImageUrl?: string;
    homepageUrl?: string;
    linkedinUrl?: string;
    city?: string;
    state?: string;
    country?: string;
}

export class CompanyProfileResource extends Resource<
    CompanyProfile,
    any,
    CompanyProfileCreateAttributes,
    CompanyProfileUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/companies/{companyId}/profiles', requestManager);
    }

    public get(getArgs: CompanyProfileGetAttributes): Promise<CompanyProfile> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: CompanyProfileCreateAttributes): Promise<CompanyProfile> {
        return this.makeRequest({
            method: 'POST',
            params: createArgs,
            url: `${this.basePath}`
        })
    }

    public update(id: string | number, updateArgs: CompanyProfileUpdateAttributes): Promise<CompanyProfile> {
        return this.makeRequest({
            method: 'PUT',
            params: updateArgs,
            url: `${this.basePath}`
        })
    }
}
