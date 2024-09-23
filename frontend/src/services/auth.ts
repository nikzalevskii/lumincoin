import config from "../../config/config";
import {UserInfoType} from "../types/user-info.type";

export class Auth {
    public static accessTokenKey:string = 'accessToken';
    public static refreshTokenKey:string = 'refreshToken';
    public static userInfoKey:string = 'userInfo';
    public static isTokenRefreshing:boolean = false;


    public static async processUnauthorizedResponse():Promise<boolean> {
        this.isTokenRefreshing = true;
        const refreshToken: string | null = this.getAuthInfo(this.refreshTokenKey);
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

    public static setTokens(accessToken: string, refreshToken: string):void {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
    }

    public static getAuthInfo(key: null | string = null): any {
        if (key) {
            if (key === this.accessTokenKey) {
                return localStorage.getItem(this.accessTokenKey);
            } else if (key === this.refreshTokenKey) {
                return localStorage.getItem(this.refreshTokenKey);
            } else if (key === this.userInfoKey) {
                return JSON.parse((localStorage.getItem(this.userInfoKey) as string));
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

    public static removeTokens():void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }

    public static setUserInfo(id:number, name:string, lastName:string):void {
        localStorage.setItem(this.userInfoKey, JSON.stringify({
            id: id,
            name: name,
            lastName: lastName
        }));
    }

    public static getUserInfo():UserInfoType | string | null {
        const userInfo:string | null = localStorage.getItem(this.userInfoKey);
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }

    public static removeUserInfo():void {
        localStorage.removeItem(this.userInfoKey);
    }


}