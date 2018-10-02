import * as Promise from 'bluebird';

import {
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { StagedSalesforceData } from '../entities';

export interface StagedSalesforceDataListAttributes extends HudAiListAttributes {
    userId?: string;
    type?: string;
    status?: string;
}

export interface StagedSalesforceDataUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    status: string;
    failedMessage?: string;
}

export class StagedSalesforceDataResource extends Resource<
    StagedSalesforceData,
    StagedSalesforceDataListAttributes,
    any,
    StagedSalesforceDataUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/users/salesforce/staged', requestManager);
    }

    public list(listArgs: StagedSalesforceDataListAttributes): Promise<{ count: number, rows: StagedSalesforceData[] }> {
        return this._list(listArgs);
    }

    public update(id: string, updateArgs: StagedSalesforceDataUpdateAttributes): Promise<StagedSalesforceData> {
        return this._update(id, updateArgs);
    }
}
