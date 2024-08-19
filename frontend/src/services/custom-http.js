import {Auth} from "./auth";
import config from "../../config/config";

export class CustomHttp {
    static async request(url, method = 'GET', body = null) {
        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        }
        if (body) {
            params.body = JSON.stringify(body);
        }

        const response = await fetch(config.host + url, params);

        if (response.status < 200 || response.status >= 300) {
            if (response.status === 401) {
                const result = await Auth.processUnauthorizedResponse();
                if (result) {
                    return await this.request(url, method, body);
                } else {
                    return null;
                }
            }
            throw new Error(response.message);
        }

        return await response.json();
    }
}