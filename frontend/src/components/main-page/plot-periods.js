import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";
import Chart from 'chart.js/auto';

export class PlotPeriods {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!Auth.getUserInfo(Auth.accessTokenKey) || !Auth.getUserInfo(Auth.refreshTokenKey)) {
            this.openNewRoute('/signup').then();
        }

    }


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

        const items = result.response;
        const incomes = items.filter(item => item.category && item.type === 'income');
        const expenses = items.filter(item => item.category && item.type === 'expense');
        const incomesRes = this.getItems(incomes);
        const expensesRes = this.getItems(expenses);
        let incomePlotCategory = [];
        let incomePlotAmount = []
        let expensePlotCategory = [];
        let expensePlotAmount = [];


        incomesRes.forEach(item => {
            incomePlotCategory.push(item.category);
            incomePlotAmount.push(item.amount);
        });
        expensesRes.forEach(item => {
            expensePlotCategory.push(item.category);
            expensePlotAmount.push(item.amount);
        });


        this.getChart(incomePlotCategory, incomePlotAmount, expensePlotCategory, expensePlotAmount);

    }

    static getChart(incomePlotCategory, incomePlotAmount, expensePlotCategory, expensePlotAmount) {

        // chart JS
        let chartIncome = Chart.getChart('myChartIncome');
        if (chartIncome) {
            chartIncome.destroy();
        }

        const ctxIncome = document.getElementById('myChartIncome');
        ctxIncome.innerHTML = ' ';

        chartIncome = new Chart(ctxIncome, {
            type: 'pie',
            data: {
                labels: incomePlotCategory,
                datasets: [{
                    label: 'значение ',
                    data:  incomePlotAmount,
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
        let chartExpense = Chart.getChart('myChartExpense');
        if (chartExpense) {
            chartExpense.destroy();
        }
        const ctxExpense = document.getElementById('myChartExpense');
        ctxExpense.innerHTML = ' ';
        chartExpense = new Chart(ctxExpense, {
            type: 'pie',
            data: {
                labels: expensePlotCategory,
                datasets: [{
                    label: 'значение ',
                    data: expensePlotAmount,
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

        const items = result.response;
        const incomes = items.filter(item => item.type === 'income');
        const expenses = items.filter(item => item.type === 'expense');
        const incomesRes = this.getItems(incomes);
        const expensesRes = this.getItems(expenses);
        let incomePlotCategory = [];
        let incomePlotAmount = []
        let expensePlotCategory = [];
        let expensePlotAmount = [];


        incomesRes.forEach(item => {
            incomePlotCategory.push(item.category);
            incomePlotAmount.push(item.amount);
        });
        expensesRes.forEach(item => {
            expensePlotCategory.push(item.category);
            expensePlotAmount.push(item.amount);
        });


        // chart JS
        const ctxIncome = document.getElementById('myChartIncome');

        new Chart(ctxIncome, {
            type: 'pie',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
                labels: incomePlotCategory,
                datasets: [{
                    label: '# of Votes',
                    // data: [12, 19, 3, 5, 3],
                    data:  incomePlotAmount,
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
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
                labels: expensePlotCategory,
                datasets: [{
                    label: '# of Votes',
                    // data: [12, 19, 3, 2, 3],
                    data: expensePlotAmount,
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

    }

    static getItems(items) {

        const resObj = items.reduce((acc, record) => {
            const { category, amount } = record;
            if (!acc[category]) acc[category] = { amount: 0};
            acc[category].amount += parseInt(amount);
            acc[category].category = category;
            return acc;
        }, {});
        const res = Object.values(resObj);

        return res;

    }

}


