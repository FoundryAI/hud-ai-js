import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface StockAlert {
    id: string;
    companyId: string;
    firstValue: number;
    firstValueOccurredAt: Date;
    secondValue: number;
    secondValueOccurredAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface StockAlertListAttributes extends HudAiListAttributes {
    companyId?: string | string[];
    occurredBefore?: Date;
    occurredAfter?: Date;
    limit?: number;
    offset?: number;
}

export interface StockAlertCreateAttributes extends HudAiCreateAttributes {
    companyId: string;
    firstValue: number;
    firstValueOccurredAt: Date;
    secondValue: number;
    secondValueOccurredAt: Date;
}

export interface StockAlertGetAttributes {
    id: string;
}

export interface StockAlertDestroyAttributes {
    id: string;
}

export class StockAlertResource extends Resource<
    StockAlert,
    StockAlertListAttributes,
    StockAlertCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/companies/stock-alerts', requestManager);
    }

    public list(listArgs: StockAlertListAttributes): Promise<{ count: number, rows: StockAlert[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: StockAlertCreateAttributes): Promise<StockAlert> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: StockAlertGetAttributes): Promise<StockAlert> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
        })
        .then((result) => {
            result.firstValue = parseFloat(result.firstValue);
            result.secondValue = parseFloat(result.secondValue);
            return result;
        })
    }

    public del(destroyArgs: StockAlertDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: StockAlertDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{id}`
        })
    }
}
