import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";
import {HttpResultType} from "../../types/http-result.type";

export class Logout {
    public openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        if (!Auth.getAuthInfo(Auth.accessTokenKey) || !Auth.getAuthInfo(Auth.refreshTokenKey)) {
            this.openNewRoute('/login').then();
            return;
        }

        this.logout().then();
    }

    async logout() {
        const result:HttpResultType = await CustomHttp.request('/logout', 'POST', false, {
            refreshToken: Auth.getAuthInfo(Auth.refreshTokenKey),
        });

        Auth.removeTokens();
        Auth.removeUserInfo();
        await this.openNewRoute('/login');
    }

}