
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: '9e58e025500941d3ab5fdca9b0e3b59c', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
