import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface BasicVideoCompany {
    companyId: string;
}

export interface VideoCompany extends BasicVideoCompany {
    id: string;
    videoId: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface VideoCompanyListAttributes extends HudAiListAttributes {
    videoId: string;
    companyId?: string;
}

export interface VideoCompanyCreateAttributes extends HudAiCreateAttributes {
    videoId: string;
    companyId: string;
}

export interface VideoCompanyDestroyAttributes {
    videoId: string;
    companyId: string;
}

export class VideoCompanyResource extends Resource<
    VideoCompany,
    VideoCompanyListAttributes,
    VideoCompanyCreateAttributes,
    any
    > {
    constructor(requestManager: RequestManager) {
        super('/videos/companies', requestManager);
    }

    public list(listArgs: VideoCompanyListAttributes): Promise<{ count: number, rows: VideoCompany[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public related(companyId: string): Promise<{ rows: { companyId: string }[] }> {
        return this.makeRequest({
            method: 'GET',
            params: { companyId },
            url: `${this.basePath}/{companyId}/related`
        })
    }

    public create(createArgs: VideoCompanyCreateAttributes): Promise<VideoCompany> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: VideoCompanyDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: VideoCompanyDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}`
        })
    }
}
