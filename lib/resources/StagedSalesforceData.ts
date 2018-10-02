import * as Promise from 'bluebird';

import {
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { StagedSalesforceData } from '../entities';

export interface StagedSalesforceDataListAttributes extends HudAiListAttributes {
    userId: string;
    type?: string;
    status?: string;
}

export interface StagedSalesforceDataUpdateAttributes extends HudAiUpdateAttributes {
    id: string;
    userId: string;
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
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`,
        });
    }

    public update(updateArgs: StagedSalesforceDataUpdateAttributes): Promise<StagedSalesforceData> {
        return this.makeRequest({
            method: 'PUT',
            data: updateArgs,
            url: `${this.basePath}/{id}`,
        });
    }
}
