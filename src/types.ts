export type UrlString = {
    endpoint: string;
    options?: {
        sources: string;
    };
};

export type CbFunc<T> = (data: T) => void;

export enum HttpReq{
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    HEAD = 'HEAD',
    OPTION = 'OPTION',
    DELETE = 'DELETE'
}

export enum HttpMistakes{
    mistake400 = 400,
    mistake401,
    mistake402,
    mistake403,
    mistake404,
}

export interface ISource {
    id: string;
    name: string;
}
export interface ISourceRes {
    sources: ISource[];
}

export interface IArticle {
    source: ISource;
    author: string;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

export interface IArticleRes {
    articles: IArticle[];
}