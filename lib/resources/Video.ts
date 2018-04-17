import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { BasicVideoCompany } from './VideoCompany';
import { BasicVideoPerson } from './VideoPerson';

export interface Video extends BasicVideo {
    companies?: BasicVideoCompany[];
    people?: BasicVideoPerson[];
}

export interface BasicVideo {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    posterUrl: string|null;
    videoUrl: string;
    importanceScore: number;
    sourceId: string;
    publishedAt: Date;
    title: string;
    description: string;
    transcript: string;
}

export interface VideoSearchResult extends BasicVideo {
    companies: BasicVideoCompany[];
    people: BasicVideoPerson[];
}

export interface VideoListAttributes extends HudAiListAttributes {
    personId?: string;
    companyId?: string;
    importanceScoreMin?: number;
    sourceId?: string;
    publishedAfter?: Date;
    publishedBefore?: Date;
}

export interface VideoCreateAttributes extends HudAiCreateAttributes {
    posterUrl?: string;
    videoUrl: string;
    importanceScore: number;
    publishedAt: Date;
    title: string;
    description?: string;
    transcript?: string;
}

export interface VideoUpdateAttributes extends HudAiUpdateAttributes {
    posterUrl?: string;
    videoUrl?: string;
    importanceScore?: number;
    publishedAt?: Date;
    title?: string;
    description?: string;
    transcript?: string;
}

export interface VideoSearchAttributes {
    limit?: number,
    offset?: number,
    personId?: string|string[];
    companyId?: string|string[];
    minImportance?: number;
    maxImportance?: number;
    text?: string;
    sourceId?: string;
    createdAfter?: Date;
    createdBefore?: Date;
    publishedAfter?: Date;
    publishedBefore?: Date;
}

export interface GroupedTagCount {
    [term: string]: {
        [tag: string]: number
    };
}

export class VideoResource extends Resource<
    Video,
    VideoListAttributes,
    VideoCreateAttributes,
    VideoUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/videos', requestManager);
    }

    public list(listArgs: VideoListAttributes): Promise<{ count: number, rows: Video[] }> {
        return this._list(listArgs);
    }

    public search(searchArgs: VideoSearchAttributes): Promise<{ count: number, rows: VideoSearchResult[] }> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search`
        })
    }

    public create(createArgs: VideoCreateAttributes): Promise<Video> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Video> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: VideoUpdateAttributes): Promise<Video> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
