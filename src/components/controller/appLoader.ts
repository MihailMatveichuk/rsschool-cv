import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '9e58e025500941d3ab5fdca9b0e3b59c',
        });
    }
}

export default AppLoader;
