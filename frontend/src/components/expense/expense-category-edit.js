export class ExpenseCategoryEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('categories').classList.add('collapsed');
        document.getElementById('orders-collapse').classList.add('show');
        document.getElementById('category-block').classList.add('category-block-active');
        document.getElementById('category-block').classList.add('category-expense-active');
        document.getElementById('categories-text').classList.add('categories-text-active');

        document.getElementById('main-page').classList.remove('active');
        document.getElementById('main-page').classList.add('main-active-off-picture');

        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this))
        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this));

        console.log('EXPENSE-EDIT')
    }

    async toIncome() {
        await this.openNewRoute('/income');
    }

    async toExpense() {
        await this.openNewRoute('/expense');
    }
}