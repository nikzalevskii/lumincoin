import {CustomHttp} from "../../services/custom-http";

export class IncomesAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        // document.body.style.backgroundColor = '#FFF';
        // this.itemsToDelete = document.getElementsByClassName('flow-table-icons-delete');
        // for (let i = 0; i < this.itemsToDelete.length; i++) {
        //     this.itemsToDelete[i].addEventListener('click', function () {
        //         document.getElementById('item-popup').style.display = 'block';
        //         document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';
        //         document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        //     })
        // }
        this.getOperations('2024-08-23', '2024-08-23').then();


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
            icons.innerHTML = '<a href="/incomes-expenses/operation-delete?id=">\n' +
                '                    <img class="flow-table-icons-delete" src="/images/trash_icon.svg" alt="">\n' +
                '                </a>\n' +
                '                <a href="/incomes-expenses/edititem?id=">\n' +
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