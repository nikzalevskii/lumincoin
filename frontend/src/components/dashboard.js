import {Auth} from "../services/auth";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        // console.log(Auth.getAuthInfo().length === 0);
        if (!Auth.getUserInfo()) {
            this.toSignUp();
        }
        this.mainPageElement = document.getElementById('main-page');
        this.userBlockElement = document.getElementById('user-block');
        this.dropLogoutElement = document.getElementById('drop-logout');
        this.categoriesMainBlockElement = document.getElementById('categories');
        this.categoriesBlockElement = document.getElementById('category-block');
        this.categoriesArrowElement = document.getElementById('categories-arrow');
        this.categoriesCategoriesCollapseElement = document.getElementById('orders-collapse');
        // console.log(this.categoriesCategoriesCollapseElement);



        document.getElementById('user-block').addEventListener('click', function () {
            document.getElementById('drop-logout').classList.add('dropdown-menu-show');
        })
        document.getElementById('categories').addEventListener('click', function () {
            document.getElementById('drop-logout').classList.add('dropdown-menu-show');
        })
        // document.getElementById('categories').addEventListener('click', this.toIncome.bind(this));

        console.log('DASHBOARD');

    }

    // async toIncome() {
    //     await this.openNewRoute('/income');
    // }

    async toSignUp() {
        await this.openNewRoute('/signup');
    }


}