import {Auth} from "../services/auth";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        // console.log(Auth.getAuthInfo().length === 0);
        if (!Auth.getUserInfo()) {
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