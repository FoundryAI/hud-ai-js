import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { UserJobFunction } from '../entities';

export interface UserJobFunctionListAttributes extends HudAiListAttributes {
    userId?: string;
    jobFunctionId?: string;
}

export interface UserJobFunctionCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    jobFunctionId: string;
}

export interface UserJobFunctionUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    jobFunctionId?: string;
}

export interface UserJobFunctionDestroyAttributes {
    userId?: string;
    id: string;
}

export class UserJobFunctionResource extends Resource<
    UserJobFunction,
    UserJobFunctionListAttributes,
    UserJobFunctionCreateAttributes,
    UserJobFunctionUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/people/users/job-functions', requestManager);
    }

    public list(listArgs: UserJobFunctionListAttributes): Promise<{ count: number, rows: UserJobFunction[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: UserJobFunctionCreateAttributes): Promise<UserJobFunction> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<UserJobFunction> {
        return this._get(id);
    }

    public update(id: string, updateArgs: UserJobFunctionUpdateAttributes): Promise<UserJobFunction> {
        return this._update(id, updateArgs);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
