export class Expense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this))
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