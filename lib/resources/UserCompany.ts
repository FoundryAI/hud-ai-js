import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserCompany {
    id: string;
    userId: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCompanyGetAttributes {
    userId: string;
    companyId: string;
}

export interface UserCompanyListAttributes extends HudAiListAttributes {
    userId: string;
    companyId?: string;
}

export interface UserCompanyCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    companyId: string;
}

export interface UserCompanyDestroyAttributes {
    userId: string;
    companyId: string;
}

export class UserCompanyResource extends Resource<
    UserCompany,
    UserCompanyListAttributes,
    UserCompanyCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/{userId}/companies', requestManager);
    }

    public list(listArgs: UserCompanyListAttributes): Promise<UserCompany[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserCompanyCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            params: _.pick(createArgs, 'userId'),
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: UserCompanyGetAttributes): Promise<UserCompany> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{companyId}`
        })
    }

    public del(destroyArgs: UserCompanyDestroyAttributes) {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserCompanyDestroyAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{companyId}`
        })
    }
}
