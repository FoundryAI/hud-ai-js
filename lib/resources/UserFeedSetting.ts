import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserFeedSetting } from '../entities';

export interface UserFeedSettingListAttributes extends HudAiListAttributes {
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
    userId?: string;
    id: string;
}

export interface UserFeedSettingDestroyAttributes {
    userId?: string;
    id: string;
}

export class UserFeedSettingResource extends Resource<
    UserFeedSetting,
    UserFeedSettingListAttributes,
    UserFeedSettingCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/users/feed-settings', requestManager);
    }

    public upsert(upsertArgs: UserFeedSettingCreateAttributes) {
        return this.makeRequest({
            method: 'PUT',
            data: upsertArgs,
            url: `${this.basePath}`
        });
    }

    public list(listArgs: UserFeedSettingListAttributes):
        Promise<{ count: number, rows: UserFeedSetting[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: UserFeedSettingCreateAttributes): Promise<UserFeedSetting> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: UserFeedSettingGetAttributes): Promise<UserFeedSetting> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
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
            url: `${this.basePath}/{id}`
        })
    }
}
