import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserFeedSetting } from '../entities';
import * as _ from "lodash";

export interface UserFeedSettingCreateAttributes extends HudAiCreateAttributes {
    userId: string;
    recency?: number;
    showLocal?: boolean;
    showForeign?: boolean;
    companiesWeight?: number;
    peopleWeight?: number;
    interestsWeight?: number;
    sourcesWeight?: number;
    quotesWeight?: number;
    videosWeight?: number;
}

export interface UserFeedSettingGetAttributes {
    userId: string;
}

export interface UserFeedSettingDestroyAttributes {
    userId: string;
}

export class UserFeedSettingResource extends Resource<
    UserFeedSetting,
    any,
    UserFeedSettingCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/{userId}/feed-settings', requestManager);
    }

    public upsert(upsertArgs: UserFeedSettingCreateAttributes) {
        return this.makeRequest({
            method: 'PUT',
            params: _.pick(upsertArgs, 'userId'),
            data: _.omit(upsertArgs, 'userId'),
            url: `${this.basePath}`
        });
    }

    public create(createArgs: UserFeedSettingCreateAttributes): Promise<UserFeedSetting> {
        return this.makeRequest({
            method: 'POST',
            params: _.pick(createArgs, 'userId'),
            data: _.omit(createArgs, 'userId'),
            url: `${this.basePath}`
        })
    }

    public get(getArgs: UserFeedSettingGetAttributes): Promise<UserFeedSetting> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: UserFeedSettingDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: UserFeedSettingDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: _.pick(destroyArgs, 'userId'),
            data: _.omit(destroyArgs, 'userId'),
            url: `${this.basePath}`
        })
    }
}
