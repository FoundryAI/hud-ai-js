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
    name: string|null;
    maxBillableAccounts: number;
    emailDomain: string;
    signedLicenseAgreementAt: Date | null;
    ownerUserId: string;
    planId: string|null;
    subscriptionId: string|null;
    customerId: string|null;
}

export interface OrganizationListAttributes extends HudAiListAttributes {
    id?: string;
    name?: string;
    planId?: string;
    emailDomain?: string;
    ownerUserId?: string;
}

export interface OrganizationCreateAttributes extends HudAiCreateAttributes {
    name?: string;
    maxBillableAccounts?: number;
    emailDomain: string;
    signedLicenseAgreementAt?: Date;
    ownerUserId?: string;
}

export interface OrganizationUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    maxBillableAccounts?: number;
    emailDomain?: string;
    signedLicenseAgreementAt?: Date;
    ownerUserId?: string;
}

export interface OrganizationSubscriptionCreateAttributes extends HudAiCreateAttributes {
    plan: string,
    source?: string
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

    public createSubscription(args: OrganizationSubscriptionCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: args,
            url: `${this.basePath}/billing/subscriptions`
        })
    }

    public cancelSubscription() {
        return this.makeRequest({
            method: 'POST',
            url: `${this.basePath}/billing/subscriptions/cancel`
        })
    }
}
