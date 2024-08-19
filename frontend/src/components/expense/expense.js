export class Expense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this))

        document.getElementById('categories').classList.add('collapsed');
        document.getElementById('orders-collapse').classList.add('show');
        document.getElementById('category-block').classList.add('category-block-active');
        document.getElementById('category-block').classList.add('category-expense-active');

        document.getElementById('main-page').classList.remove('active');
        document.getElementById('main-page').classList.add('main-active-off-picture');
        document.getElementById('categories-text').classList.add('categories-text-active');
        // document.getElementById('incomes-expenses-page').classList.remove('active');
        // document.getElementById('incomes-expenses-page').classList.remove('ie-active-off-picture');


        console.log('EXPENSE');

        document.getElementById('add-expense').addEventListener("click", this.newExpenseCategory.bind(this));

        this.expensesDelete = document.getElementsByClassName('expense-category-delete');
        for (let i = 0; i < this.expensesDelete.length; i++) {
            this.expensesDelete[i].addEventListener('click', function () {
                document.getElementById('expense-popup').style.display = 'block';
                // document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.45)';
            })
        }

    }

    async toIncome() {
        await this.openNewRoute('/income');
    }

    async newExpenseCategory() {
        await this.openNewRoute('/expense/category-create');
    }

}