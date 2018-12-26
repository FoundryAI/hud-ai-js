import * as Promise from 'bluebird';
import * as _ from 'lodash';

import { HudAiListAttributes, HudAiUpdateAttributes, Resource } from '../utils/Resource';
import { UserConference, UserConferenceStatus } from '../entities/UserConference';
import { RequestManager } from '../RequestManager';
import { UserDigestSubscription } from '../entities';

export interface UserConferenceListAttributes extends HudAiListAttributes {
    userId: string;
}

export interface UserConferenceCreateAttributes {
    userId: string;
    conferenceId: string;
    status: UserConferenceStatus;
}

export interface UserConferenceGetAttributes {
    id: string;
}

export class UserConferenceResource extends Resource<
    UserConference,
    UserConferenceListAttributes,
    UserConferenceCreateAttributes,
    HudAiUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/users/conferences', requestManager);
    }

    public add(addArgs: UserConferenceCreateAttributes): Promise<UserConference> {
        return this.makeRequest({
            method: 'POST',
            data: _.merge(addArgs, {
                status: UserConferenceStatus.ADDED
            }),
            url: `${this.basePath}`
        });
    }

    public remove(removeArgs: UserConferenceCreateAttributes): Promise<UserConference> {
        return this.makeRequest({
            method: 'POST',
            data: _.merge(removeArgs, {
                status: UserConferenceStatus.REMOVED
            }),
            url: `${this.basePath}`
        });
    }

    public list(listArgs: UserConferenceListAttributes): Promise<{ count: number, rows: UserConference[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        });
    }

    public get(getArgs: UserConferenceGetAttributes): Promise<UserDigestSubscription> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
        });
    }

    public del(id: string): Promise<void> {
        return this._destroy(id);
    }
}