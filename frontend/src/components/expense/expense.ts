import {CustomHttp} from "../../services/custom-http";
import {DefaultResponseType} from "../../types/default-response.type";
import {GetCategoriesType} from "../../types/get-categories.type";
import {HttpResultType} from "../../types/http-result.type";

export class Expense {
    public openNewRoute: (url: string) => Promise<void>;
    private expensesDelete: HTMLCollection | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.getExpenses().then();

        const incomeBlockEl:HTMLElement | null = document.getElementById('income-block');
        if (incomeBlockEl) {
            incomeBlockEl.addEventListener('click', this.toIncome.bind(this))
        }
        const addExpenseEl:HTMLElement | null = document.getElementById('add-expense');
        if (addExpenseEl) {
            addExpenseEl.addEventListener("click", this.newExpenseCategory.bind(this));
        }
        this.expensesDelete = document.getElementsByClassName('expense-category-delete');
        for (let i = 0; i < this.expensesDelete.length; i++) {
            this.expensesDelete[i].addEventListener('click', function () {
                const expensePopupEl:HTMLElement | null = document.getElementById('expense-popup');
                if (expensePopupEl) {
                    expensePopupEl.style.display = 'block';
                }
            })
        }

    }

    async getExpenses() {
        const result:HttpResultType = await CustomHttp.request('/categories/expense');

        if (result) {
            if (result.redirect) {
                await this.openNewRoute(result.redirect);
                return;
            }

            if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
                return;
            }
        }

        this.showExpenses((result.response as GetCategoriesType[]));

    }

    showExpenses(expenses: GetCategoriesType[]) {
        const expensesElement:HTMLElement | null = document.getElementById('expensesElement');
        const addElementBlock:HTMLElement | null = document.getElementById('add-expense');
        if (expensesElement && addElementBlock) {
            expensesElement.innerHTML = '';
            expensesElement.appendChild(addElementBlock);
            for (let i = expenses.length - 1; i >= 0 ; i--) {
                const expenseElement:HTMLElement | null = document.createElement('div');
                expenseElement.classList.add('expense');
                const pElement:HTMLElement | null = document.createElement('p');
                pElement.classList.add('expense-text');
                pElement.innerText = expenses[i].title;
                const actionsElement:HTMLElement | null = document.createElement('div');
                actionsElement.classList.add('expense-actions');
                const editElement = document.createElement('a');
                editElement.classList.add('expense-category-edit');
                editElement.innerText = 'Редактировать';
                editElement.href = '/expense/category-edit?id=' + expenses[i].id;
                const deleteElement:HTMLElement | null = document.createElement('a');
                deleteElement.classList.add('expense-category-delete');
                deleteElement.innerText = 'Удалить';
                (deleteElement as HTMLLinkElement).href = '/expense/category-expense-delete?id=' + expenses[i].id;
                actionsElement.appendChild(editElement);
                actionsElement.appendChild(deleteElement);
                expenseElement.appendChild(pElement);
                expenseElement.appendChild(actionsElement);
                expensesElement.prepend(expenseElement);
            }
        }

    }

    async toIncome() {
        await this.openNewRoute('/income');
    }

    async newExpenseCategory() {
        await this.openNewRoute('/expense/category-create');
    }

}