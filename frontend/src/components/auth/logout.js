import {CustomHttp} from "../../services/custom-http";
import config from "../../../config/config";
import {Auth} from "../../services/auth";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!Auth.getAuthInfo(Auth.accessTokenKey) || !Auth.getAuthInfo(Auth.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.logout().then();
    }

    async logout() {
        const result = await CustomHttp.request('/logout', 'POST', false, {
            refreshToken: Auth.getAuthInfo(Auth.refreshTokenKey),
        });

        Auth.removeTokens();
        Auth.removeUserInfo();
        this.openNewRoute('/login');
    }

}