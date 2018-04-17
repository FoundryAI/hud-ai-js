import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { JobFunction } from '../entities';

export interface JobFunctionListAttributes extends HudAiListAttributes {
    userId?: string;
    name?: string;
}

export interface JobFunctionCreateAttributes extends HudAiCreateAttributes {
    name: string;
    textCorpus: string;
}

export interface JobFunctionUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    textCorpus?: string;
}

export interface JobFunctionDestroyAttributes {
    userId?: string;
    id: string;
}

export class JobFunctionResource extends Resource<
    JobFunction,
    JobFunctionListAttributes,
    JobFunctionCreateAttributes,
    JobFunctionUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/people/job-functions', requestManager);
    }

    public list(listArgs: JobFunctionListAttributes): Promise<{ count: number, rows: JobFunction[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: JobFunctionCreateAttributes): Promise<JobFunction> {
        return this._create(createArgs);
    }

    public get(id: string): Promise<JobFunction> {
        return this._get(id);
    }

    public update(id: string, updateArgs: JobFunctionUpdateAttributes): Promise<JobFunction> {
        return this._update(id, updateArgs);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
