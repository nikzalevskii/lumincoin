import {CustomHttp} from "../services/custom-http";
import {RouteType} from "../types/route-type";
import {BalanceType, HttpResultType} from "../types/http-result.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Layout {
    public openNewRoute: (url: string) => Promise<void>;
    private userDropdown: Element | HTMLElement | null;
    readonly userText: HTMLElement | null;
    readonly userBlock: HTMLElement | null;

    constructor(activatedRoute: RouteType, openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.userDropdown = document.getElementsByClassName('dropdown-toggle')[0];
        this.userText = document.getElementById('username-layout');
        this.userBlock = document.getElementById('user-block');
        if (this.userText && this.userBlock) {
            if (this.userText.offsetWidth / this.userBlock.offsetWidth > 0.7) {
                (this.userDropdown as HTMLElement).style.whiteSpace = 'normal';
            }
        }


        const incomesExpensesPageEl: HTMLElement | null = document.getElementById('incomes-expenses-page');
        const mainPageEl: HTMLElement | null = document.getElementById('main-page');
        const categoryBlockEl: HTMLElement | null = document.getElementById('category-block');
        const categoriesEl: HTMLElement | null = document.getElementById('categories');
        const ordersCollapseEl: HTMLElement | null = document.getElementById('orders-collapse');
        const categoriesTextEl: HTMLElement | null = document.getElementById('categories-text');


        if (activatedRoute.route === '/') {
            if (incomesExpensesPageEl && mainPageEl && categoryBlockEl && categoriesEl && ordersCollapseEl && categoriesTextEl) {
                incomesExpensesPageEl.classList.remove('active');
                mainPageEl.classList.add('active');
                incomesExpensesPageEl.classList.remove('ie-active-off-picture');
                mainPageEl.classList.remove('main-active-off-picture');
                categoryBlockEl.classList.remove('category-block-active');
                categoriesEl.classList.add('collapsed');
                ordersCollapseEl.classList.remove('show');
                categoriesTextEl.classList.remove('categories-text-active');
            }

        }

        if (activatedRoute.route) {
            if ('/' + activatedRoute.route.split('/')[1] === '/incomes-expenses') {
                if (incomesExpensesPageEl && mainPageEl && categoryBlockEl && categoriesEl && ordersCollapseEl && categoriesTextEl) {
                    mainPageEl.classList.remove('active');
                    mainPageEl.classList.add('main-active-off-picture');
                    incomesExpensesPageEl.classList.add('ie-active-off-picture');
                    incomesExpensesPageEl.style.color = 'white';
                    incomesExpensesPageEl.classList.add('active');
                    categoryBlockEl.classList.remove('category-block-active');
                    categoriesEl.classList.add('collapsed');
                    ordersCollapseEl.classList.remove('show');
                    categoriesTextEl.classList.remove('categories-text-active');
                }

            }
            if ('/' + activatedRoute.route.split('/')[1] === '/income') {
                if (incomesExpensesPageEl && mainPageEl && categoryBlockEl && ordersCollapseEl && categoriesTextEl) {
                    incomesExpensesPageEl.classList.remove('active');
                    mainPageEl.classList.remove('active');
                    incomesExpensesPageEl.classList.remove('ie-active-off-picture');
                    mainPageEl.classList.add('main-active-off-picture');
                    categoriesTextEl.classList.add('categories-text-active');

                    categoryBlockEl.classList.remove('category-expense-active');
                    categoryBlockEl.classList.add('category-block-active');
                    categoryBlockEl.classList.add('category-income-active');
                    ordersCollapseEl.classList.add('show');
                }

            }
            if ('/' + activatedRoute.route.split('/')[1] === '/expense') {
                if (incomesExpensesPageEl && mainPageEl && categoryBlockEl && ordersCollapseEl && categoriesTextEl) {
                    incomesExpensesPageEl.classList.remove('active');
                    mainPageEl.classList.remove('active');
                    incomesExpensesPageEl.classList.remove('ie-active-off-picture');
                    mainPageEl.classList.add('main-active-off-picture');
                    categoriesTextEl.classList.add('categories-text-active');

                    categoryBlockEl.classList.remove('category-income-active');
                    categoryBlockEl.classList.add('category-block-active');
                    categoryBlockEl.classList.add('category-expense-active');
                    ordersCollapseEl.classList.add('show');
                }

            }
        }


        this.getBalance().then();

    }

    private async getBalance(): Promise<void> {
        const balanceItem: HTMLElement | null = document.getElementById('balance-value');
        const result: HttpResultType = await CustomHttp.request('/balance');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || !result.response || (result.response as DefaultResponseType).error) {
                return alert('Возникла ошибка при запросе баланса. Обратитесь в поддержку');
            }

            if (balanceItem) {
                balanceItem.innerText = (result.response as BalanceType).balance + '$';
            }

        }
    }


}
