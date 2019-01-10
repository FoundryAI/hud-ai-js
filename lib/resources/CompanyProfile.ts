import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { CompanyProfile } from '../entities';
import * as _ from "lodash";

export interface CompanyProfileGetAttributes {
    companyId: string;
}

export interface CompanyProfileCreateAttributes extends HudAiCreateAttributes {
    companyId: string;
    description?: string;
    profileImageUrl?: string;
    homepageUrl?: string;
    linkedinUrl?: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface CompanyProfileUpdateAttributes extends HudAiUpdateAttributes {
    companyId: string;
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
            params: _.pick(createArgs, 'companyId'),
            data: _.omit(createArgs, 'companyId'),
            url: `${this.basePath}`
        })
    }

    public update(updateArgs: CompanyProfileUpdateAttributes): Promise<CompanyProfile> {
        return this.makeRequest({
            method: 'PUT',
            params: _.pick(updateArgs, 'companyId'),
            data: _.omit(updateArgs, 'companyId'),
            url: `${this.basePath}`
        })
    }
}
