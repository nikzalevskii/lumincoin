import {CustomHttp} from "../../services/custom-http";

export class ExpenseCategoryCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.categoryValueElement = document.getElementById('new-expense-category-name');

        document.getElementById('create-expense-category').addEventListener('click', this.createNewExpenseCategory.bind(this));

        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this));
        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this));


        console.log('INCOME-CREATE')
    }

    async createNewExpenseCategory() {
        const result = await CustomHttp.request('/categories/expense', 'POST', true, {
            title: this.categoryValueElement.value,
        });

        if (result) {
            if (result.error || !result.response || (result.response && !result.response.id || !result.response.title)) {
                alert('Ошибка в добавлении категории');
                this.openNewRoute('/');
                return;
            }
            this.openNewRoute('/expense');


        }

    }

    async toIncome() {
        await this.openNewRoute('/income');
    }
    async toExpense() {
        await this.openNewRoute('/expense');
    }


}
