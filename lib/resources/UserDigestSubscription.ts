import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserDigestSubscription {
    id: string;
    dayOfWeek: string;
    isoHour: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDigestSubscriptionListAttributes extends HudAiListAttributes {
    userId: string;
    dayOfWeek?: string;
    isoHour?: string;
}

export interface UserDigestSubscriptionCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    dayOfWeek: string;
    isoHour: string;
}

export interface UserDigestSubscriptionGetAttributes {
    userId: string;
    id: string;
}

export interface UserDigestSubscriptionDestroyAttributes {
    userId: string;
    id: string;
}

export class UserDigestSubscriptionResource extends Resource<
    UserDigestSubscription,
    UserDigestSubscriptionListAttributes,
    UserDigestSubscriptionCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/{userId}/digest-subscriptions', requestManager);
    }

    public list(listArgs: UserDigestSubscriptionListAttributes): Promise<UserDigestSubscription[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserDigestSubscriptionCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: UserDigestSubscriptionGetAttributes): Promise<UserDigestSubscription> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
        })
    }

    public del(destroyArgs: UserDigestSubscriptionDestroyAttributes) {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserDigestSubscriptionDestroyAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{id}`
        })
    }
}
