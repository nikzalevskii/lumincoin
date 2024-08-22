import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";

export class ExpenseCategoryEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.expenseValueInput = document.getElementById('category-expense-value');
        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            return this.openNewRoute('/');
        }
        // console.log(this.id);

        this.getExpense().then();
        document.getElementById('save-category-expense').addEventListener('click', this.editCategory.bind(this));

        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this))
        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this));

        console.log('EXPENSE-EDIT')
    }

    async editCategory() {
        console.log(this.expenseValueInput.value);
        const result = await CustomHttp.request('/categories/expense/' + this.id, 'PUT', true, {
            title: this.expenseValueInput.value,
        });

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            alert('Возникла ошибка при редактировании расхода. Обратитесь в поддержку');
            this.openNewRoute('/');
        }
        console.log(result);
        console.log(result.response);
        this.openNewRoute('/expense');
    }

    async getExpense() {
        const result = await CustomHttp.request('/categories/expense/' + this.id);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе расхода. Обратитесь в поддержку');
            }
            this.expenseValueInput.value = result.response.title;
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