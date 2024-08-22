import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";

export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        // let token  = Auth.getAuthInfo(Auth.accessTokenKey);
        // if (!token) {
        //     // токена нет
        //     return this.openNewRoute('/login');
        // }

        this.incomeElement = null;

        this.getIncomes().then();

        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this))

        document.getElementById('add-income').addEventListener("click", this.newIncomeCategory.bind(this));

        this.incomesDelete = document.getElementsByClassName('income-category-delete');
        for (let i = 0; i < this.incomesDelete.length; i++) {
            this.incomesDelete[i].addEventListener('click', function () {
                document.getElementById('income-popup').style.display = 'block';
                document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';
                // document.body.style.backgroundColor = 'black';
            })
        }
        this.incomesEdit = document.getElementsByClassName('income-category-edit');
        for (let i = 0; i < this.incomesEdit.length; i++) {
            this.incomesEdit[i].addEventListener('click', this.toCategoryEdit.bind(this));
        }


    }

    async getIncomes() {
        const result = await CustomHttp.request('/categories/income');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
            }
        }

        console.log(result.response);
        this.showIncomes(result.response);

    }

    showIncomes(incomes) {
        const incomesElement = document.getElementById('incomesElement');
        // incomesElement.innerHTML = '';
        for (let i = incomes.length - 1; i >= 0 ; i--) {
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
            actionsElement.appendChild(editElement);
            actionsElement.appendChild(deleteElement);
            this.incomeElement.appendChild(pElement);
            this.incomeElement.appendChild(actionsElement);
            incomesElement.prepend(this.incomeElement);
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