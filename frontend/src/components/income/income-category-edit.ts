import {CustomHttp} from "../../services/custom-http";
import {UrlUtils} from "../../utils/url-utils";
import {DefaultResponseType} from "../../types/default-response.type";
import {EditCategoryType} from "../../types/edit-category.type";
import {HttpResultType} from "../../types/http-result.type";

export class IncomeCategoryEdit {
    public openNewRoute: (url: string) => Promise<void>;
    public id: string | null;
    private incomeValueInput: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.incomeValueInput = document.getElementById('category-income-value');
        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            this.openNewRoute('/').then();
            return;
        }

        this.getIncome().then();
        const saveCategoryIncome:HTMLElement | null = document.getElementById('save-category-income');
        const incomeBlockEl:HTMLElement | null = document.getElementById('income-block');
        const expenseBlockEl:HTMLElement | null =  document.getElementById('expense-block');

        if (saveCategoryIncome) {
            saveCategoryIncome.addEventListener('click', this.editCategory.bind(this));
        }

        if (incomeBlockEl) {
            incomeBlockEl.addEventListener('click', this.toIncome.bind(this))
        }
        if (expenseBlockEl) {
            expenseBlockEl.addEventListener('click', this.toExpense.bind(this));
        }

    }

    async editCategory():Promise<void> {
        const result:HttpResultType = await CustomHttp.request('/categories/income/' + this.id, 'PUT', true, {
            title: (this.incomeValueInput as HTMLInputElement).value,
        });

        if (result.redirect || result.error || !result.response || (result.response && ((result.response as DefaultResponseType).error))) {
            alert('Возникла ошибка при редактировании дохода. Обратитесь в поддержку');
            await this.openNewRoute('/');
        }
        await this.openNewRoute('/income');
    }

    async getIncome() {
        const result:HttpResultType = await CustomHttp.request('/categories/income/' + this.id);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                return alert('Возникла ошибка при запросе дохода. Обратитесь в поддержку');
            }
            (this.incomeValueInput as HTMLInputElement).value = (result.response as EditCategoryType).title;
        }
        return result.response;

    }


    async toIncome():Promise<void> {
        await this.openNewRoute('/income');
    }

    async toExpense():Promise<void> {
        await this.openNewRoute('/expense');
    }


}
