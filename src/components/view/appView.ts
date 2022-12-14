import News from './news/news';
import Sources from './sources/sources';
import type { IArticleRes, ISourceRes } from '../../types';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IArticleRes) {
        const values = data?.articles || [];
        this.news.draw(values);
    }

    drawSources(data: ISourceRes) {
        const values = data?.sources || [];
        this.sources.draw(values);
    }
}

export default AppView;