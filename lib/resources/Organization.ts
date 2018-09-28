import * as Promise from 'bluebird';
import { omit } from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import {Organization, OrganizationUserRole, User} from '../entities';

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
    planId?: string;
}

export interface OrganizationUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    maxBillableAccounts?: number;
    emailDomain?: string;
    signedLicenseAgreementAt?: Date;
    ownerUserId?: string;
    planId?: string;
}

export interface OrganizationSubscriptionCreateAttributes extends HudAiCreateAttributes {
    plan: string,
    source?: string
}

export interface OrganizationUserListAttributes extends HudAiListAttributes {
    organizationId: string;
    email?: string;
    name?: string;
}

export interface OrganizationUserRoleGetAttributes {
    organizationId: string;
    userId: string;
}

export interface OrganizationUserRoleUpdateAttributes {
    organizationId: string;
    userId: string;
    role: 'admin' | 'owner' | 'manager' | 'member';
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

    public getRole(args: OrganizationUserRoleGetAttributes): Promise<OrganizationUserRole>{
        return this.makeRequest({
            method: 'GET',
            url: `${this.basePath}/${args.organizationId}/roles/${args.userId}`
        })
    }

    public updateRole(args: OrganizationUserRoleUpdateAttributes): Promise<OrganizationUserRole>{
        return this.makeRequest({
            method: 'PUT',
            data: { role: args.role },
            url: `${this.basePath}/${args.organizationId}/roles/${args.userId}`
        })
    }

    public deactivateUser(listArgs: OrganizationUserListAttributes): Promise<User>{
        return this.makeRequest({
            method: 'POST',
            params: listArgs,
            url: `${this.basePath}/{organizationId}/users/deactivate`
        })
    }

    public getUsers(listArgs: OrganizationUserListAttributes): Promise<{ count: number, rows: User[] }>{
        return this.makeRequest({
            method: 'GET',
            params: omit(listArgs, 'organizationId'),
            url: `${this.basePath}/${listArgs.organizationId}/users`
        })
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

    public getSubscription() {
        return this.makeRequest({
            method: 'GET',
            url: `${this.basePath}/billing/subscriptions`
        })
    }
}
