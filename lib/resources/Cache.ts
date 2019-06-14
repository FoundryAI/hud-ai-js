import * as Promise from 'bluebird';

import { Resource } from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface CacheRefreshAttributes {
    userId?: string;
}

export class CacheResource extends Resource<any, any, any, any> {
    constructor(requestManager: RequestManager) {
        super('/cache/refresh', requestManager);
    }

    public refresh(refreshArgs: CacheRefreshAttributes): Promise<void> {
        return this.makeRequest({
            method: 'POST',
            data: refreshArgs,
            url: `${this.basePath}`
        })
    }
}
