import {CustomHttp} from "../../services/custom-http";

export class Expense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getExpenses().then();

        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this))
        document.getElementById('add-expense').addEventListener("click", this.newExpenseCategory.bind(this));
        this.expensesDelete = document.getElementsByClassName('expense-category-delete');
        for (let i = 0; i < this.expensesDelete.length; i++) {
            this.expensesDelete[i].addEventListener('click', function () {
                document.getElementById('expense-popup').style.display = 'block';
            })
        }

    }

    async getExpenses() {
        const result = await CustomHttp.request('/categories/expense');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
            }
        }

        this.showExpenses(result.response);

    }

    showExpenses(expenses) {
        const expensesElement = document.getElementById('expensesElement');
        const addElementBlock = document.getElementById('add-expense');
        expensesElement.innerHTML = '';
        expensesElement.appendChild(addElementBlock);
        for (let i = expenses.length - 1; i >= 0 ; i--) {
            const expenseElement = document.createElement('div');
            expenseElement.classList.add('expense');
            const pElement = document.createElement('p');
            pElement.classList.add('expense-text');
            pElement.innerText = expenses[i].title;
            const actionsElement = document.createElement('div');
            actionsElement.classList.add('expense-actions');
            const editElement = document.createElement('a');
            editElement.classList.add('expense-category-edit');
            editElement.innerText = 'Редактировать';
            editElement.href = '/expense/category-edit?id=' + expenses[i].id;
            const deleteElement = document.createElement('a');
            deleteElement.classList.add('expense-category-delete');
            deleteElement.innerText = 'Удалить';
            deleteElement.href = '/expense/category-expense-delete?id=' + expenses[i].id;
            actionsElement.appendChild(editElement);
            actionsElement.appendChild(deleteElement);
            expenseElement.appendChild(pElement);
            expenseElement.appendChild(actionsElement);
            expensesElement.prepend(expenseElement);
        }
    }

    async toIncome() {
        await this.openNewRoute('/income');
    }

    async newExpenseCategory() {
        await this.openNewRoute('/expense/category-create');
    }

}