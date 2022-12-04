export type url = {
    endpoint: string;
    options: {
        sources: string;
    };
};

export type callback<T> = (data: T) => void;

export interface Source {
    id: string;
    name: string;
    [key: string]: string;
}

export interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface sourceRes {
    status: string;
    sources: Source[];
}

export interface articleRes {
    status: string;
    totalResults: number;
    articles: Article[];
}