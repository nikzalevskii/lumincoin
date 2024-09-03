import {Auth} from "./auth";
import config from "../../config/config";

export class CustomHttp {
    static async request(url, method = 'GET', useAuth = true, body = null) {

        const result = {
            error: false,
            response: null
        }

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        };
        let token = null;
        if (useAuth) {
            token = Auth.getAuthInfo(Auth.accessTokenKey);
            if (token) {
                params.headers['x-auth-token'] = token;
            }
        }

        if (body) {
            params.body = JSON.stringify(body);
        }
        let response = null;
        try {
            response = await fetch(config.host + url, params);
            result.response = await response.json();

        } catch (e) {
            result.error = true;
            return result;
        }

        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (response.status === 401 && useAuth) {
                if (!token) {
                    // токена нет
                    result.redirect = '/login';
                } else {
                    if (!Auth.isTokenRefreshing) {
                        //2-  токен устарел/невалидный (надо обновить)
                        const updateTokenResult = await Auth.processUnauthorizedResponse();
                        if (updateTokenResult) {
                            // запрос повторно
                            return await this.request(url, method, useAuth, body);
                        } else {
                            result.redirect = '/login';
                        }
                    } else {
                        return await this.request(url, method, useAuth, body);
                    }
                }
            }
        }

        return result;
    }
}