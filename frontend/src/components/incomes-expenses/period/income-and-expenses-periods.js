import {CustomHttp} from "../../../services/custom-http";

export class IncomeAndExpensesPeriods {


    static async getOperations(dateFrom, dateTo, openNewRoute) {
        const result = await CustomHttp.request('/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        if (result) {
            if (result.redirect) {
                return openNewRoute(result.redirect);
            }
            if (result.error || !result.response || result.response.error) {
                return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
            }
        }

        this.showOperations(result.response);
    }

    static async getAllOperations(openNewRoute) {
        const result = await CustomHttp.request('/operations');
        if (result) {
            if (result.redirect) {
                return openNewRoute(result.redirect);
            }
            if (result.error || !result.response || result.response.error) {
                return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
            }
        }

        this.showOperations(result.response);
    }

    static showOperations(operations) {
        const tableBlock = document.getElementById('table');
        tableBlock.innerText = ' ';
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].category) {
                const trElement = document.createElement('tr');
                trElement.classList.add('flow-table-block');
                const number = trElement.insertCell();
                number.innerText = i + 1;
                number.classList.add('flow-table-text');

                const type = trElement.insertCell();
                type.innerText = operations[i].type === 'income' ? 'доход' : 'расход';
                type.style.color = operations[i].type === 'income' ? 'green' : 'red';
                type.classList.add('flow-table-text');

                const category = trElement.insertCell();
                category.innerText = operations[i].category.toLowerCase();
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