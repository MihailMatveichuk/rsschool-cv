import { urlString, cbFunc, HttpReq } from "../../types";


class Loader {
    private baseLink: string;
    private options: { apiKey: string };
    
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(url: urlString, callback: cbFunc<T>) {
        this.load(HttpReq.GET, url.endpoint, callback, url.options ?? {});
    }

    errorHandler(res: Response): Response | never {

        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: { sources?: string }, endpoint: string)  {
        const urlOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]) => {
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: cbFunc<T>, options: { sources?: string }): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}


export default Loader;
