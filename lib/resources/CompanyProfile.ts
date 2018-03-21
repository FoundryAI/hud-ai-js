import * as Promise from 'bluebird';

import {
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { CompanyProfile } from '../entities';

export interface CompanyProfileGetAttributes {
    companyId: string;
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
