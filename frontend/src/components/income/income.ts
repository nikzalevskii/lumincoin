import {CustomHttp} from "../../services/custom-http";
import {DefaultResponseType} from "../../types/default-response.type";
import {GetCategoriesType} from "../../types/get-categories.type";
import {HttpResultType} from "../../types/http-result.type";

export class Income {
    public openNewRoute: (url: string) => Promise<void>;
    private incomeElement: HTMLElement | null;
    private incomesEdit: HTMLCollection | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.incomeElement = null;

        this.getIncomes().then();

        const expenseBlockEl:HTMLElement | null = document.getElementById('expense-block');
        if (expenseBlockEl) {
            expenseBlockEl.addEventListener('click', this.toExpense.bind(this))
        }

        const addIncomeEl:HTMLElement | null = document.getElementById('add-income');
        if (addIncomeEl) {
            addIncomeEl.addEventListener("click", this.newIncomeCategory.bind(this));
        }


        this.incomesEdit = document.getElementsByClassName('income-category-edit');
        for (let i = 0; i < this.incomesEdit.length; i++) {
            this.incomesEdit[i].addEventListener('click', this.toCategoryEdit.bind(this));
        }


    }

    private async getIncomes():Promise<void> {
        const result:HttpResultType = await CustomHttp.request('/categories/income');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                return alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
            }
        }

        this.showIncomes((result.response as GetCategoriesType[]));

    }

    showIncomes(incomes: GetCategoriesType[]) {
        const incomesElement:HTMLElement | null = document.getElementById('incomesElement');
        const addElementBlock:HTMLElement | null = document.getElementById('add-income');
        if (incomesElement && addElementBlock) {
            incomesElement.innerHTML = '';
            incomesElement.appendChild(addElementBlock);
            for (let i = incomes.length - 1; i >= 0; i--) {
                this.incomeElement = document.createElement('div');
                this.incomeElement.classList.add('income');
                const pElement = document.createElement('p');
                pElement.classList.add('income-text');
                pElement.innerText = incomes[i].title;
                const actionsElement = document.createElement('div');
                actionsElement.classList.add('income-actions');
                const editElement = document.createElement('a');
                editElement.classList.add('income-category-edit');
                editElement.innerText = 'Редактировать';
                editElement.href = '/income/category-edit?id=' + incomes[i].id;
                const deleteElement = document.createElement('a');
                deleteElement.classList.add('income-category-delete');
                deleteElement.innerText = 'Удалить';
                deleteElement.href = '/income/category-income-delete?id=' + incomes[i].id;
                actionsElement.appendChild(editElement);
                actionsElement.appendChild(deleteElement);
                this.incomeElement.appendChild(pElement);
                this.incomeElement.appendChild(actionsElement);
                incomesElement.prepend(this.incomeElement);
            }
        }

    }

    async toCategoryEdit() {
        await this.openNewRoute('/income/category-edit');
    }

    async toExpense() {
        await this.openNewRoute('/expense');
    }

    async newIncomeCategory() {
        await this.openNewRoute('/income/category-create');
    }

}