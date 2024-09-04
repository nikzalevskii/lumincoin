import {Auth} from "../services/auth";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!Auth.getAuthInfo(Auth.accessTokenKey) || !Auth.getAuthInfo(Auth.refreshTokenKey)) {
            this.openNewRoute('/signup');
        }

        document.getElementById('user-block').addEventListener('click', function () {
            document.getElementById('drop-logout').classList.add('dropdown-menu-show');
        })


    }


}