import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface Collateral {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    contentUrl: string;
    plaintextUrl: string;
    filetype: string;
    size: number;
    dataScienceMetadata: Object;
    createdAt: Date;
    updatedAt: Date;
}

export interface CollateralListAttributes extends HudAiListAttributes {
    id?: string;
    organizationId: string;
    name?: string;
}

export interface CollateralSearchAttributes extends HudAiListAttributes {
    id?: string;
    organizationId?: string;
    text?: string;
    filetype?: string;
    createdBefore?: Date;
    createdAfter?: Date;
}

export interface CollateralCreateAttributes extends HudAiCreateAttributes {
    name: string;
    description?: string;
    contentUrl: string;
    plaintextUrl?: string;
    filetype?: string;
    size?: number;
    dataScienceMetadata?: Object;
}

export interface CollateralGetAttributes {
    id: string;
    organizationId: string;
}

export interface CollateralUpdateAttributes extends HudAiUpdateAttributes {
    id: string;
    organizationId: string;
    name?: string;
    description?: string;
    contentUrl?: string;
    plaintextUrl?: string;
    filetype?: string;
    size?: number;
    dataScienceMetadata?: Object;
}

export interface CollateralDestroyAttributes {
    id: string;
    organizationId: string;
}

export class CollateralResource extends Resource<
    Collateral,
    CollateralListAttributes,
    CollateralCreateAttributes,
    CollateralUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/organizations/{organizationId}/collateral', requestManager);
    }

    public list(listArgs: CollateralListAttributes): Promise<{ count: number, rows: Collateral[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public search(searchArgs: CollateralSearchAttributes): Promise<{ count: number, rows: Collateral[] }> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `/organizations/collateral/search`
        });
    }

    public create(createArgs: CollateralCreateAttributes): Promise<Collateral> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public downloadUri(getArgs: CollateralGetAttributes): Promise<Collateral> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}/download-uri`
        })
    }

    public get(getArgs: CollateralGetAttributes): Promise<Collateral> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
        })
    }

    public update(updateArgs: CollateralUpdateAttributes): Promise<Collateral> {
        return this.makeRequest({
            method: 'PUT',
            params: updateArgs,
            url: `${this.basePath}/{id}`
        })
    }

    public del(destroyArgs: CollateralDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: CollateralDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{id}`
        })
    }
}
