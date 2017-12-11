import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

import { Company } from './Company';

export interface UserCompanyGroupBase {
    id: string;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCompanyGroup extends UserCompanyGroupBase {
    companies: Company[];
}

export interface UserCompanyGroupListElement extends UserCompanyGroupBase {
    companies: { id: string }[],
}

export interface UserCompanyGroupListAttributes extends HudAiListAttributes {
    userId?: string;
}

export interface UserCompanyGroupCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    name: string;
}

export interface UserCompanyGroupUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    name: string;
}

export interface UserCompanyGroupUpdateCompaniesAttributes {
    id: string;
    companyId: string;
}

export class UserCompanyGroupResource extends Resource<
    UserCompanyGroup,
    UserCompanyGroupListAttributes,
    UserCompanyGroupCreateAttributes,
    UserCompanyGroupUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/companies/groups', requestManager);
    }

    public list(listArgs: UserCompanyGroupListAttributes): Promise<{ count: number, rows: UserCompanyGroupListElement[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: UserCompanyGroupCreateAttributes): Promise<UserCompanyGroup> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<UserCompanyGroup> {
        return this._get(id);
    }

    public update(id: string, updateArgs: UserCompanyGroupUpdateAttributes): Promise<UserCompanyGroup> {
        return this._update(id, updateArgs);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }

    public addCompany(addArgs: UserCompanyGroupUpdateCompaniesAttributes): Promise<UserCompanyGroup> {
        return this.makeRequest({
            method: 'POST',
            params: addArgs,
            url: `${this.basePath}/{id}/companies`
        })
    }

    public removeCompany(destroyArgs: UserCompanyGroupUpdateCompaniesAttributes): Promise<UserCompanyGroup> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{id}/companies`
        })
    }
}
