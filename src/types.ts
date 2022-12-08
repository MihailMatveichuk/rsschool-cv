export type urlString = {
    endpoint: string;
    options?: {
        sources: string;
    };
};
export type cbFunc<T> = (data: T) => void;

export interface ISource {
    id: string;
    name: string;
    [key: string]: string;
}

export interface IArticle {
    source: ISource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ISourceRes {
    status: string;
    sources: ISource[];
}

export interface IArticleRes {
    status: string;
    totalResults: number;
    articles: IArticle[];
}