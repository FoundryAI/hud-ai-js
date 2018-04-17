import { ArticleSearchResult } from './Article';
import { Quote } from './Quote';
import { RequestManager } from '../RequestManager';
import { Tweet } from './Tweet';

export interface FeedArticle extends ArticleSearchResult {
    _type: 'article';
}

export interface FeedQuote extends Quote {
    _type: 'quote';
}

export interface FeedTweet extends Tweet {
    _type: 'tweet';
}

export type FeedItem = FeedArticle | FeedQuote | FeedTweet;
