import {CustomHttp} from "../../../services/custom-http";

export class IncomeAndExpensesAllPeriod {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const today = new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);
        const dayAtWeek = date.getDay() - 1;
        const firstDayWeek =  new Date(y, m, date.getDate() - dayAtWeek + 1).toISOString().slice(0, 10);
        const lastDayWeek =  new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);

        const firstDayMonth = new Date(y, m, 2).toISOString().slice(0, 10);
        const lastDayMonth = new Date(y, m + 1, 1).toISOString().slice(0, 10);

        const firstDayYear = new Date(y, 0, 2).toISOString().slice(0, 10);
        const lastDayYear = new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);

        const startAllPeriod = '0000-01-01';
        const finishAllPeriod = '9999-12-31';


        document.getElementById('all-period').classList.add('flow-period-active');
        document.getElementById('month').classList.remove('flow-period-active');
        document.getElementById('week').classList.remove('flow-period-active');
        document.getElementById('today').classList.remove('flow-period-active');
        document.getElementById('year').classList.remove('flow-period-active');

        this.getOperations(startAllPeriod, finishAllPeriod).then();

    }

    async getOperations(dateFrom, dateTo) {
        // 2024-08-23
        const result = await CustomHttp.request('/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        // console.log(result.response);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || !result.response || result.response.error) {
                return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
            }
        }

        // console.log(result.response);
        this.showOperations(result.response);
    }

    async showOperations(operations) {
        // console.log('show operations');
        const tableBlock = document.getElementById('table');
        for (let i = 0; i < operations.length; i++) {
            console.log()
            const trElement = document.createElement('tr');
            trElement.classList.add('flow-table-block');
            // trElement.insertCell().innerText = i + 1;
            const number = trElement.insertCell();
            number.innerText = i + 1;
            number.classList.add('flow-table-text');

            const type = trElement.insertCell();
            type.innerText = operations[i].type === 'income' ? 'доход' : 'расход';
            type.style.color = operations[i].type === 'income' ?  'green' : 'red';
            type.classList.add('flow-table-text');

            const category = trElement.insertCell();
            category.innerText = operations[i].category.toLowerCase();
            // category.innerText = operations[i].category;
            category.classList.add('flow-table-text');

            const amount = trElement.insertCell();
            amount.innerText = operations[i].amount + '$';
            amount.classList.add('flow-table-text');

            const date = trElement.insertCell();
            date.innerText = operations[i].date;
            date.classList.add('flow-table-text');

            const comment = trElement.insertCell();
            comment.innerText = operations[i].comment;
            comment.classList.add('flow-table-text');

            const icons = trElement.insertCell();
            icons.innerHTML = '<a href="/incomes-expenses/operation-delete?id=' + operations[i].id + '">\n' +
                '                    <img class="flow-table-icons-delete" src="/images/trash_icon.svg" alt="">\n' +
                '                </a>\n' +
                '                <a href="/incomes-expenses/edititem?id=' + operations[i].id + '">\n' +
                '                    <img class="flow-table-icons-edit" src="/images/pen_icon.svg" alt="">\n' +
                '                </a>';
            icons.classList.add('flow-table-text');
            icons.classList.add('flow-table-icons');

            tableBlock.appendChild(trElement);
        }




    }

    async findCategory(type, id) {
        const result = await CustomHttp.request('/categories/' + type);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
            }
        }
        return result.response.find(title => title.id === id).title;
    }
}