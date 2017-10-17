import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface RelevantArticleCollateral {
    id: string;
    relevantArticleId: string;
    collateralId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RelevantArticleCollateralListAttributes extends HudAiListAttributes {
    relevantArticleId: string;
    collateralId?: string;
}

export interface RelevantArticleCollateralCreateAttributes extends HudAiCreateAttributes {
    relevantArticleId: string;
    collateralId: string;
}

export interface RelevantArticleCollateralGetAttributes {
    relevantArticleId: string;
    collateralId: string;
}

export interface RelevantArticleCollateralDestroyAttributes {
    relevantArticleId: string;
    collateralId: string;
}

export class RelevantArticleCollateralResource extends Resource<
    RelevantArticleCollateral,
    RelevantArticleCollateralListAttributes,
    RelevantArticleCollateralCreateAttributes,
    {} // No update attributes
> {
    constructor(requestManager: RequestManager) {
        super('/relevant-articles/{relevantArticleId}/collateral', requestManager);
    }

    public list(listArgs: RelevantArticleCollateralListAttributes): Promise<{ count: number, rows: RelevantArticleCollateral[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: RelevantArticleCollateralCreateAttributes): Promise<RelevantArticleCollateral> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: RelevantArticleCollateralGetAttributes): Promise<RelevantArticleCollateral> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{collateralId}`
        })
    }

    public del(destroyArgs: RelevantArticleCollateralDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: RelevantArticleCollateralDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{collateralId}`
        })
    }
}
