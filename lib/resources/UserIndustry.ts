import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserIndustry {
    id: string;
    userId?: string;
    industryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserIndustryGetAttributes {
    userId?: string;
    industryId: string;
}

export interface UserIndustryListAttributes extends HudAiListAttributes {
    userId?: string;
    industryId?: string;
}

export interface UserIndustryCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    industryId: string;
}

export interface UserIndustryDestroyAttributes {
    userId?: string;
    industryId: string;
}

export class UserIndustryResource extends Resource<
    UserIndustry,
    UserIndustryListAttributes,
    UserIndustryCreateAttributes,
    any
    > {
    constructor(requestManager: RequestManager) {
        super('/companies/industries/users', requestManager);
    }

    public list(listArgs: UserIndustryListAttributes): Promise<{ count: number, rows: UserIndustry[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserIndustryCreateAttributes): Promise<UserIndustry> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: UserIndustryGetAttributes): Promise<UserIndustry> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{industryId}`
        })
    }

    public del(destroyArgs: UserIndustryDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserIndustryDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{industryId}`
        })
    }
}
