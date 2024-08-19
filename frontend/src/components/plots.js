export class Plots {
    constructor() {

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
}