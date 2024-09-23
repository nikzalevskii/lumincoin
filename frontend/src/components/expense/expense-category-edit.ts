import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";
import {DefaultResponseType} from "../../types/default-response.type";
import {GetCategoriesType} from "../../types/get-categories.type";
import {HttpResultType} from "../../types/http-result.type";

export class ExpenseCategoryEdit {
    public openNewRoute: (url: string) => Promise<void>;
    public id: string | null;
    readonly expenseValueInput: HTMLElement | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.expenseValueInput = document.getElementById('category-expense-value');
        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            this.openNewRoute('/').then();
            return;
        }

        this.getExpense().then();

        const saveCategoryExpense:HTMLElement | null = document.getElementById('save-category-expense');
        const incomeBlockEl:HTMLElement | null = document.getElementById('income-block');
        const expenseBlockEl:HTMLElement | null =  document.getElementById('expense-block');
        if (saveCategoryExpense) {
            saveCategoryExpense.addEventListener('click', this.editCategory.bind(this));
        }
        if (incomeBlockEl) {
            incomeBlockEl.addEventListener('click', this.toIncome.bind(this));
        }
        if (expenseBlockEl) {
            expenseBlockEl.addEventListener('click', this.toExpense.bind(this));
        }

    }

    async editCategory() {
        if (this.expenseValueInput) {
            const result:HttpResultType = await CustomHttp.request('/categories/expense/' + this.id, 'PUT', true, {
                title: (this.expenseValueInput as HTMLInputElement).value,
            });

            if (result.redirect || result.error || !result.response || (result.response && ((result.response as DefaultResponseType).error))) {
                alert('Возникла ошибка при редактировании расхода. Обратитесь в поддержку');
                await this.openNewRoute('/');
            }
            await this.openNewRoute('/expense');
        }

    }

    async getExpense() {
        const result:HttpResultType = await CustomHttp.request('/categories/expense/' + this.id);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                return alert('Возникла ошибка при запросе расхода. Обратитесь в поддержку');
            }
            if (this.expenseValueInput) {
                (this.expenseValueInput as HTMLInputElement).value = (result.response as GetCategoriesType).title;
            }
        }
        return result.response;

    }

    async toIncome() {
        await this.openNewRoute('/income');
    }

    async toExpense() {
        await this.openNewRoute('/expense');
    }
}