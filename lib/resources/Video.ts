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
    companyId?: string;
    importanceScoreMin?: number;
    keyTerm?: string;
    linkHash?: string;
    publishedAfter?: Date;
    publishedBefore?: Date;
    type?: string;
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
    authors?: string[],
    companyId?: string | string[];
    createdAfter?: Date,
    createdBefore?: Date,
    keyTerms?: string[],
    maxImportance?: number,
    minImportance?: number,
    groupId?: string,
    publishedAfter?: Date,
    publishedBefore?: Date,
    scoredAfter?: Date,
    scoredBefore?: Date,
    tags?: string[],
    text?: string,
    type?: string,
}

export interface VideoSearchRelevantAttributes {
    limit?: number,
    offset?: number,
    authors?: string[],
    createdAfter?: Date,
    createdBefore?: Date,
    keyTerms?: string[],
    maxImportance?: number,
    maxRelevance?: number,
    minImportance?: number,
    minRelevance?: number,
    publishedAfter?: Date,
    publishedBefore?: Date,
    scoredAfter?: Date,
    scoredBefore?: Date,
    tags?: string[],
    text?: string,
    type?: string,
    userId?: string,
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

    public searchRelevant(searchArgs: VideoSearchRelevantAttributes): Promise<{ count: number, rows: VideoSearchResult[] }> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search/relevant`
        })
    }

    public searchRelevantByTerm(searchArgs: VideoSearchRelevantAttributes): Promise<{ term: string, count: number, rows: VideoSearchResult[] }[]> {
        return this.makeRequest({
            method: 'GET',
            params: searchArgs,
            url: `${this.basePath}/search/relevant/grouped/by-term`
        })
    }

    public searchRelevantByTermAndCountTags(countArgs: VideoSearchRelevantAttributes): Promise<GroupedTagCount> {
        return this.makeRequest({
            method: 'GET',
            params: _.merge(countArgs, { countTags: true }),
            url: `${this.basePath}/search/relevant/grouped/by-term`
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
