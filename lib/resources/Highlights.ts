import * as Promise from 'bluebird';
import {RequestManager, RequestOptions} from '../RequestManager';

export interface TextAnalysisQueryOpts {
    corpus?: string;
}

export interface PageHighlightQueryOpts extends TextAnalysisQueryOpts {
    url: string;
}

export interface TextHighlightQueryOpts extends TextAnalysisQueryOpts {
    text: string;
}

export interface Highlights {
    sentence: { [key: string]: string };
    relevance: { [key: string]: number };
}


export class HighlightResource {
    private basePath = '/highlights';
    private requestManager: RequestManager;

    constructor(requestManager: RequestManager) {
        this.requestManager = requestManager;
    }

    public makeRequest(options: RequestOptions) {
        return this.requestManager.makeRequest(options);
    }

    public page(params: PageHighlightQueryOpts): Promise<Highlights> {
        return this.makeRequest({
            method: 'GET',
            params,
            url: `${this.basePath}/page`
        })
    }

    public text(params: TextHighlightQueryOpts): Promise<Highlights> {
        return this.makeRequest({
            method: 'GET',
            params,
            url: `${this.basePath}/text`
        })
    }
}
