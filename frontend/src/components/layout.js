import {Auth} from "../services/auth";
import {CustomHttp} from "../services/custom-http";

export class Layout {
    constructor(activatedRoute, openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.userDropdown = document.getElementsByClassName('dropdown-toggle')[0];
        this.userText = document.getElementById('username-layout');
        this.userBlock = document.getElementById('user-block');
        // console.log(this.userText.offsetWidth);
        // console.log(this.userBlock.offsetWidth);
        if (this.userText.offsetWidth / this.userBlock.offsetWidth > 0.7) {
            this.userDropdown.style.whiteSpace = 'normal';
        }

        if (activatedRoute.route === '/') {
            document.getElementById('incomes-expenses-page').classList.remove('active');
            document.getElementById('main-page').classList.add('active');
            document.getElementById('incomes-expenses-page').classList.remove('ie-active-off-picture');
            document.getElementById('main-page').classList.remove('main-active-off-picture');
            document.getElementById('category-block').classList.remove('category-block-active');
            document.getElementById('categories').classList.add('collapsed');
            document.getElementById('orders-collapse').classList.remove('show');
            document.getElementById('categories-text').classList.remove('categories-text-active');
        }

        if ('/' + activatedRoute.route.split('/')[1] === '/incomes-expenses') {
            document.getElementById('main-page').classList.remove('active');
            document.getElementById('main-page').classList.add('main-active-off-picture');
            document.getElementById('incomes-expenses-page').classList.add('ie-active-off-picture');
            document.getElementById('incomes-expenses-page').style.color = 'white';
            document.getElementById('incomes-expenses-page').classList.add('active');
            document.getElementById('category-block').classList.remove('category-block-active');
            document.getElementById('categories').classList.add('collapsed');
            document.getElementById('orders-collapse').classList.remove('show');
            document.getElementById('categories-text').classList.remove('categories-text-active');
        }
        if ('/' + activatedRoute.route.split('/')[1] === '/income') {
            // console.log('/' + activatedRoute.route.split('/')[1]);
            document.getElementById('incomes-expenses-page').classList.remove('active');
            document.getElementById('main-page').classList.remove('active');
            document.getElementById('incomes-expenses-page').classList.remove('ie-active-off-picture');
            document.getElementById('main-page').classList.add('main-active-off-picture');
            document.getElementById('categories-text').classList.add('categories-text-active');

            document.getElementById('category-block').classList.remove('category-expense-active');
            document.getElementById('category-block').classList.add('category-block-active');
            document.getElementById('category-block').classList.add('category-income-active');
            document.getElementById('orders-collapse').classList.add('show');
        }
        if ('/' + activatedRoute.route.split('/')[1] === '/expense') {
            // console.log(activatedRoute.route.split('/')[0]);
            document.getElementById('incomes-expenses-page').classList.remove('active');
            document.getElementById('main-page').classList.remove('active');
            document.getElementById('incomes-expenses-page').classList.remove('ie-active-off-picture');
            document.getElementById('main-page').classList.add('main-active-off-picture');
            document.getElementById('categories-text').classList.add('categories-text-active');

            document.getElementById('category-block').classList.remove('category-income-active');
            document.getElementById('category-block').classList.add('category-block-active');
            document.getElementById('category-block').classList.add('category-expense-active');
            document.getElementById('orders-collapse').classList.add('show');
        }

        this.getBalance().then();

    }

    async getBalance() {
        const balanceItem = document.getElementById('balance-value');
        const result = await CustomHttp.request('/balance');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || !result.response || result.response.error) {
                return alert('Возникла ошибка при запросе баланса. Обратитесь в поддержку');
            }

       balanceItem.innerText = result.response.balance + '$';

        }


    }



}
