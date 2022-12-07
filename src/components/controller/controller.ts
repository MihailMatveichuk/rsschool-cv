import AppLoader from './appLoader';
export interface sourceResponse {
    id: string;
    name: string;
    [key: string]: string;
    status: string;
}
export interface articleResponse {
    articles: any;
    source: sourceResponse;
    totalResults: number;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type cbFunc<T> = (data: T) => void;


class AppController extends AppLoader {
    getSources(callback: cbFunc<sourceResponse>) {
        super.getResp<sourceResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: cbFunc<articleResponse>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<articleResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;