import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface CompanyEvent {
    id: string;
    companyId: string;
    title: string;
    description: string;
    type: string;
    linkUrl: string;
    startsAt: Date;
    endsAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanyEventListAttributes extends HudAiListAttributes {
    companyId?: string | string[];
    startingBefore?: Date;
    startingAfter?: Date;
    endingBefore?: Date;
    endingAfter?: Date;
    occurringAt?: Date;
    title?: string;
    type?: string;
    limit?: number;
    offset?: number;
}

export interface CompanyEventCreateAttributes extends HudAiCreateAttributes {
    companyId: string;
    title: string;
    description?: string;
    type?: string;
    linkUrl?: string;
    startsAt: Date;
    endsAt: Date;
}

export interface CompanyEventGetAttributes {
    id: string;
}

export interface CompanyEventUpdateAttributes extends HudAiUpdateAttributes {
    id: string;
    companyId?: string;
    title?: string;
    description?: string;
    type?: string;
    linkUrl?: string;
    startsAt?: Date;
    endsAt?: Date;
}

export interface CompanyEventDestroyAttributes {
    id: string;
}

export class CompanyEventResource extends Resource<
    CompanyEvent,
    CompanyEventListAttributes,
    CompanyEventCreateAttributes,
    CompanyEventUpdateAttributes
> {
    constructor(requestManager: RequestManager) {
        super('/companies/events', requestManager);
    }

    public list(listArgs: CompanyEventListAttributes): Promise<{ count: number, rows: CompanyEvent[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public create(createArgs: CompanyEventCreateAttributes): Promise<CompanyEvent> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public get(getArgs: CompanyEventGetAttributes): Promise<CompanyEvent> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{id}`
        })
    }

    public update(updateArgs: CompanyEventUpdateAttributes): Promise<CompanyEvent> {
        return this.makeRequest({
            method: 'PUT',
            params: updateArgs,
            url: `${this.basePath}/{id}`
        })
    }

    public del(destroyArgs: CompanyEventDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: CompanyEventDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}/{id}`
        })
    }
}
