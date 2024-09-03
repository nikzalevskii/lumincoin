import config from "../../config/config";

export class Auth {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoKey = 'userInfo';
    static isTokenRefreshing = false;


    static async processUnauthorizedResponse(responseFrom) {
        this.isTokenRefreshing = true;
        const refreshToken = this.getAuthInfo(this.refreshTokenKey);
        if (refreshToken) {
            const response = await fetch(config.host + '/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                }),
            });

            console.log('Запрос на обновление токена прошел. AUTH.JS');
            console.log(responseFrom);
            if (response && response.status === 200) {
                const result = await response.json();
                if (result && !result.error) {
                    this.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                    this.isTokenRefreshing = false;
                    return true;
                }
            }
        }
        this.removeTokens();
        this.isTokenRefreshing = false;
        return false;
    }

    static setTokens(accessToken, refreshToken) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    static getAuthInfo(key = null) {
        if (key) {
            if (key === this.accessTokenKey) {
                return localStorage.getItem(this.accessTokenKey);
            } else if (key === this.refreshTokenKey) {
                return localStorage.getItem(this.refreshTokenKey);
            } else if (key === this.userInfoKey) {
                return JSON.parse(localStorage.getItem(this.userInfoKey));
            } else {
                return null;
            }

        } else {
            return {
                [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
                [this.userInfoKey]: localStorage.getItem(this.userInfoKey),
            }
        }
    }

    static removeTokens() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }

    static setUserInfo(id, name, lastName) {
        localStorage.setItem(this.userInfoKey, JSON.stringify({
            id: id,
            name: name,
            lastName: lastName
        }));
    }

    static getUserInfo() {
        const userInfo = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }

    static removeUserInfo() {
        localStorage.removeItem(this.userInfoKey);
    }


}