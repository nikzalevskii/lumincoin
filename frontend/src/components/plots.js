import {CustomHttp} from "../services/custom-http";

export class Plots {
    constructor() {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const today = new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);

        this.getOperations(today, today);

        // chart JS
        const ctxIncome = document.getElementById('myChartIncome');

        new Chart(ctxIncome, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 3],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Доходы'
                    }
                }
            },

        });
        // chart JS Expense

        const ctxExpense = document.getElementById('myChartExpense');

        new Chart(ctxExpense, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Расходы'
                    }
                }
            },

        });

        //
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

        console.log(result.response);
        const items = result.response;
        // return result.response;
        this.getIncomes(items);
    }

    async getIncomes(items) {
        const incomes = items.filter(item => item.type === 'income');
        console.log(incomes);

        // incomes.forEach(income => )

    }
}