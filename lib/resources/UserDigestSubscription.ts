import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserDigestSubscription {
    id: string;
    dayOfWeek: string;
    isoHour: string;
    userId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDigestSubscriptionListAttributes extends HudAiListAttributes {
    userId?: string;
    dayOfWeek?: string;
    isoHour?: string;
}

export interface UserDigestSubscriptionCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    dayOfWeek: string;
    isoHour: string;
}

export interface UserDigestSubscriptionGetAttributes {
    userId?: string;
    id: string;
}

export interface UserDigestSubscriptionDestroyAttributes {
    userId?: string;
    id: string;
}

export interface UserDigestSubscriptionUnsubscribeAttributes extends HudAiCreateAttributes {
    userId?: string;
    dayOfWeek: string;
}

export class UserDigestSubscriptionResource extends Resource<
    UserDigestSubscription,
    UserDigestSubscriptionListAttributes,
    UserDigestSubscriptionCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/digest-subscriptions', requestManager);
    }

    /**
     * Creates a subscription for a user on a particular day of the week, or updates one if it
     * already exists.
     */
    public subscribe(upsertArgs: UserDigestSubscriptionCreateAttributes) {
        return this.makeRequest({
            method: 'PUT',
            params: upsertArgs,
            url: `${this.basePath}`
        });
    }

    /**
     * Unsubscribes a user for a particular day of the week.  Does not throw errors if the user is
     * not currently subscribed for that day.
     */
    public unsubscribe(unsubscribeArgs: UserDigestSubscriptionUnsubscribeAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            data: unsubscribeArgs,
            url: `${this.basePath}`
        });
    }

    public list(listArgs: UserDigestSubscriptionListAttributes):
        Promise<{ count: number, rows: UserDigestSubscription[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserDigestSubscriptionCreateAttributes): Promise<UserDigestSubscription> {
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

    public del(destroyArgs: UserDigestSubscriptionDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserDigestSubscriptionDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: _.pick(destroyArgs, 'userId'),
            data: _.omit(destroyArgs, 'userId'),
            url: `${this.basePath}/{id}`
        })
    }
}
