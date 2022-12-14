
import Loader from './loader';

const urlLink: string = 'https://nodenews.up.railway.app/';
const apiKeyString: string = '9e58e025500941d3ab5fdca9b0e3b59c';

class AppLoader extends Loader {
    constructor() {
        super(urlLink, {
            apiKey: apiKeyString, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
