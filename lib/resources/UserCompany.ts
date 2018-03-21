import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserCompany } from '../entities';

export interface UserCompanyGetAttributes {
    userId?: string;
    companyId: string;
}

export interface UserCompanyListAttributes extends HudAiListAttributes {
    userId?: string;
    companyId?: string;
}

export interface UserCompanyCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    companyId: string;
}

export interface UserCompanyDestroyAttributes {
    userId?: string;
    companyId: string;
}

export class UserCompanyResource extends Resource<
    UserCompany,
    UserCompanyListAttributes,
    UserCompanyCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/companies', requestManager);
    }

    public list(listArgs: UserCompanyListAttributes): Promise<{ count: number, rows: UserCompany[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserCompanyCreateAttributes): Promise<UserCompany> {
        return this.makeRequest({
            method: 'POST',
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

    public del(destroyArgs: UserCompanyDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserCompanyDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{companyId}`
        })
    }
}
