import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface Organization {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    maxBillableAccounts: number;
    emailDomain: string;
    signedLicenseAgreementAt: Date | null;
    signupKey: string;
}

export interface OrganizationListAttributes extends HudAiListAttributes {
    id?: string;
    name?: string;
    signupKey?: string;
    emailDomain?: string;
}

export interface OrganizationCreateAttributes extends HudAiCreateAttributes {
    name: string;
    maxBillableAccounts?: number;
    emailDomain: string;
    signedLicenseAgreementAt?: Date;
    signupKey?: string;
}

export interface OrganizationUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    maxBillableAccounts?: number;
    emailDomain?: string;
    signedLicenseAgreementAt?: Date;
}

export class OrganizationResource extends Resource<
    Organization,
    OrganizationListAttributes,
    OrganizationCreateAttributes,
    OrganizationUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/organizations', requestManager);
    }

    public list(listArgs: OrganizationListAttributes): Promise<{ count: number, rows: Organization[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: OrganizationCreateAttributes): Promise<Organization> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<Organization> {
        return this._get(id);
    }

    public update(id: string, updateArgs: OrganizationUpdateAttributes): Promise<Organization> {
        return this._update(id, updateArgs);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
