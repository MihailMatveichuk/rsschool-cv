import AppLoader from './appLoader';
import { ISourceRes, IArticleRes, cbFunc } from '../../types';

class AppController extends AppLoader {

    getSources(callback: cbFunc<ISourceRes>) {
        super.getResp<ISourceRes>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: cbFunc<IArticleRes>) {
        let target = e.target as HTMLDivElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = <string>target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<IArticleRes>(
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
            target = target.parentNode as HTMLDivElement;
        }
    }
}

export default AppController;