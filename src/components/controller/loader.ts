import { urlString, cbFunc } from "../../types";

class Loader {
    readonly options: { apiKey: string };
    readonly baseLink: string;

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(url: urlString, callback: cbFunc<T>) {
        this.load('GET', url.endpoint, callback, url.options ?? {});
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: { sources?: string }, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.entries(urlOptions).forEach(([key, value]) => {
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: cbFunc<T>, options: { sources?: string }) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
