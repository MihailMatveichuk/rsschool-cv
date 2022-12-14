import { UrlString, CbFunc, HttpReq, HttpMistakes } from '../../types';


class Loader {
    readonly baseLink: string;
    private options: { apiKey: string };
    
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(url: UrlString, callback: CbFunc<T>) {
        this.load(HttpReq.GET, url.endpoint, callback, url.options ?? {});
    }

    errorHandler(res: Response): Response | never {

        if (!res.ok) {
            if (res.status === HttpMistakes.mistake401 || res.status === HttpMistakes.mistake404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { sources?: string }, endpoint: string)  {
        const urlOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]: [string, string]) => {
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: CbFunc<T>, options: { sources?: string }) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}


export default Loader;
