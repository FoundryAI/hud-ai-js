import * as Promise from 'bluebird';

import {
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface CompanyProfile {
    id: string;
    companyId: string;
    description: string;
    profileImageUrl: string;
    homepageUrl: string;
    linkedinUrl: string;
    city: string;
    state: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanyProfileGetAttributes {
    companyId: string;
    term: string;
}

export class CompanyProfileResource extends Resource<
    CompanyProfile,
    any,
    any,
    any
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
}
