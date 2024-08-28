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
        const incomes = items.filter(item => item.type === 'income');
        const expenses = items.filter(item => item.type === 'expense');
        const incomesRes = this.getItems(incomes);
        const expensesRes = this.getItems(expenses);
        let incomePlotCategory = [];
        let incomePlotAmount = []
        let expensePlotCategory = [];
        let expensePlotAmount = [];

        console.log(incomes);
        console.log(expenses);

        incomesRes.forEach(item => {
            incomePlotCategory.push(item.category);
            incomePlotAmount.push(item.amount);
        });
        expensesRes.forEach(item => {
            expensePlotCategory.push(item.category);
            expensePlotAmount.push(item.amount);
        });

        console.log()

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

        //

    }

    static getItems(items) {
        // const incomes = items.filter(item => item.type === 'income');
        // // console.log(incomes);
        //
        // incomes.forEach(income => {
        //
        // });

        // const res = incomes.reduce((acc, record) => {
        //     const { category, amount } = record;
        //     if (!acc[category]) acc[category] = { amount: 0};
        //     acc[category].amount += amount;
        //     acc[category].category = category;
        //     return acc;
        // }, []);
        // let i = 0;


        // const incomesSort = incomes.sort((a, b) => b['category'] - a['category']);
        const itemsSort = items.sort((a, b) => a.category.localeCompare(b.category));
        // console.log(incomesSort);

        let res = [];
        if (itemsSort.length === 1) {
            res.push({category: itemsSort[0].category, amount: itemsSort[0].amount});
        }
        if (itemsSort.length > 1) {
            for (let i = 0; i < itemsSort.length - 1; i++) {
                let amount = itemsSort[i].amount;
                let category = itemsSort[i].category;
                if (i <= itemsSort.length - 2) {
                    while (itemsSort[i].category === itemsSort[i + 1].category) {
                        amount += itemsSort[i + 1].amount;
                        if (i < itemsSort.length - 1) {
                            i++;
                            if (i === itemsSort.length - 1) {
                                break;
                            }
                        }
                    }
                }
                res.push({category: category, amount: amount});
                if (i === itemsSort.length - 2 && itemsSort[itemsSort.length - 2].category !== itemsSort[itemsSort.length - 1].category) {
                    res.push({
                        category: itemsSort[itemsSort.length - 1].category,
                        amount: itemsSort[itemsSort.length - 1].amount
                    });
                }

            }
        }


        // console.log(res);

        // let categories = [];
        // let amounts = [];
        //
        // res.forEach(item => {
        //     categories.push(item.category);
        //     amounts.push(item.amount);
        // });
        // console.log(categories);
        // console.log(amounts);



        return res;



    }

}


