import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface BasicVideoPerson {
    personId: string;
}

export interface VideoPerson extends BasicVideoPerson {
    id: string;
    videoId: string;
    personId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface VideoPersonListAttributes extends HudAiListAttributes {
    videoId: string;
    personId?: string;
}

export interface VideoPersonCreateAttributes extends HudAiCreateAttributes {
    videoId: string;
    personId: string;
}

export interface VideoPersonDestroyAttributes {
    videoId: string;
    personId: string;
}

export class VideoPersonResource extends Resource<
    VideoPerson,
    VideoPersonListAttributes,
    VideoPersonCreateAttributes,
    any
    > {
    constructor(requestManager: RequestManager) {
        super('/articles/videos/people', requestManager);
    }

    public list(listArgs: VideoPersonListAttributes): Promise<{ count: number, rows: VideoPerson[] }> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        })
    }

    public related(personId: string): Promise<{ rows: { personId: string }[] }> {
        return this.makeRequest({
            method: 'GET',
            params: { personId },
            url: `${this.basePath}/{personId}/related`
        })
    }

    public create(createArgs: VideoPersonCreateAttributes): Promise<VideoPerson> {
        return this.makeRequest({
            method: 'POST',
            data: createArgs,
            url: `${this.basePath}`
        })
    }

    public del(destroyArgs: VideoPersonDestroyAttributes): Promise<void> {
        return this.destroy(destroyArgs)
    }

    public destroy(destroyArgs: VideoPersonDestroyAttributes): Promise<void> {
        return this.makeRequest({
            method: 'DELETE',
            params: destroyArgs,
            url: `${this.basePath}`
        })
    }
}
