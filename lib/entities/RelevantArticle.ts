export interface RelevantArticle {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    articleId: string;
    articlePublishedAt: Date;
    score: number;
    scoredAt: Date;
    userId: string;
    keyTerms: string[];
    tags: string[];
    flag?: string;
}
