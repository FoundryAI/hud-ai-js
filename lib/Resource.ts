import * as Promise from 'bluebird';
import * as _ from 'lodash'

import { HudAiRequestAttributes, RequestManager } from './RequestManager';


export interface HudAiListAttributes {
    limit: number;
    offset: number;
}

export interface  HudAiCreateAttributes {}

export interface HudAiUpdateAttributes {}

export abstract class Resource<T, L extends HudAiListAttributes, C extends HudAiCreateAttributes, U extends HudAiUpdateAttributes> {

    protected basePath: string;
    protected requestManager: RequestManager;

    constructor(basePath: string, requestManager: RequestManager) {
        this.basePath = basePath;
        this.requestManager = requestManager;
    }

    public makeRequest(options: HudAiRequestAttributes) {
        return this.requestManager.makeRequest(options);
    }

    public get(id: string|number) : Promise<T> {
        return this.makeRequest({
            method: 'GET',
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

    public list(listArgs: L) : Promise<T[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public update(id: string|number, updateArgs: U) {
        return this.makeRequest({
            method: 'PUT',
            data: updateArgs,
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

    public create(createArgs: C) {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(id: string|number) {
        return this.makeRequest({
            method: 'DELETE',
            params: { id },
            url: `${this.basePath}/{id}`
        })
    }

}
