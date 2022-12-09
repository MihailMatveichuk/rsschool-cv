import './sources.css';
import type { ISource } from '../../../types';

class Sources {
    draw(data: Array<ISource>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = <HTMLDivElement>sourceItemTemp.content.cloneNode(true);

            (<HTMLDivElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            (<HTMLDivElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (<HTMLTemplateElement>document.querySelector('.sources')).append(fragment);
    }
}

export default Sources;
