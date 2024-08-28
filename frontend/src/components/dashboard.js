import {Auth} from "../services/auth";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!Auth.getAuthInfo(Auth.accessTokenKey) || !Auth.getAuthInfo(Auth.refreshTokenKey)) {
            this.toSignUp().then();
        }

        document.getElementById('user-block').addEventListener('click', function () {
            document.getElementById('drop-logout').classList.add('dropdown-menu-show');
        })
        document.getElementById('categories').addEventListener('click', function () {
            document.getElementById('drop-logout').classList.add('dropdown-menu-show');
        })
        // document.getElementById('categories').addEventListener('click', this.toIncome.bind(this));


    }

    // async toIncome() {
    //     await this.openNewRoute('/income');
    // }

    async toSignUp() {
        await this.openNewRoute('/signup');
    }


}