import {CustomHttp} from "../../../services/custom-http";
import {DefaultResponseType} from "../../../types/default-response.type";
import {GetOperationType} from "../../../types/get-operation.type";
import {HttpResultType} from "../../../types/http-result.type";

export class IncomeAndExpensesPeriods {

    public openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
    }

    static async getOperations(dateFrom:string, dateTo:string, openNewRoute: (url: string) => Promise<void>) {
        const result:HttpResultType = await CustomHttp.request('/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        if (result) {
            if (result.redirect) {
                return openNewRoute(result.redirect);
            }
            if (result.error || !result.response || (result.response as DefaultResponseType).error) {
                return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
            }
        }

        this.showOperations((result.response as GetOperationType[]));
    }


    static showOperations(operations:GetOperationType[]) {
        const tableBlock = document.getElementById('table');
        if (tableBlock) {
            tableBlock.innerText = ' ';
            for (let i = 0; i < operations.length; i++) {
                if (operations[i].category) {
                    const trElement:HTMLTableRowElement = document.createElement('tr');
                    trElement.classList.add('flow-table-block');
                    const number = trElement.insertCell();
                    number.innerText = (i + 1).toString();
                    number.classList.add('flow-table-text');

                    const type:HTMLElement | null = trElement.insertCell();
                    type.innerText = operations[i].type === 'income' ? 'доход' : 'расход';
                    type.style.color = operations[i].type === 'income' ? 'green' : 'red';
                    type.classList.add('flow-table-text');

                    const category:HTMLElement | null = trElement.insertCell();
                    category.innerText = operations[i].category.toLowerCase();
                    category.classList.add('flow-table-text');


                    const amount:HTMLElement | null = trElement.insertCell();
                    amount.innerText = operations[i].amount + '$';
                    amount.classList.add('flow-table-text');

                    const date:HTMLElement | null = trElement.insertCell();
                    date.innerText = ((operations[i].date) as string);
                    date.classList.add('flow-table-text');

                    const comment:HTMLElement | null = trElement.insertCell();
                    comment.innerText = (operations[i].comment as string);
                    comment.classList.add('flow-table-text');

                    const icons:HTMLElement | null = trElement.insertCell();
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



    }
}