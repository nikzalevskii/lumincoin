import {CustomHttp} from "../../services/custom-http";

export class IncomeCategoryCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.categoryValueElement = document.getElementById('new-income-category-name');

        document.getElementById('create-income-category').addEventListener('click', this.createNewIncomeCategory.bind(this));

        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this));
        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this));

    }


    async createNewIncomeCategory() {
        const result = await CustomHttp.request('/categories/income', 'POST', true, {
            title: this.categoryValueElement.value,
        });

        if (result) {
            if (result.error || !result.response || (result.response && !result.response.id || !result.response.title)) {
                alert('Ошибка в добавлении категории');
                this.openNewRoute('/');
                return;
            }
            this.openNewRoute('/income');


        }

    }

    async toIncome() {
        await this.openNewRoute('/income');
    }

    async toExpense() {
        await this.openNewRoute('/expense');
    }


}
