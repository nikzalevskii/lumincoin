import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";
import Chart, {ChartItem} from 'chart.js/auto';
import {GetOperationType} from "../../types/get-operation.type";
import {PlotOperationsType} from "../../types/plot-operations.type";
import {DefaultResponseType} from "../../types/default-response.type";

export class PlotPeriods {
    public openNewRoute: (url: string) => Promise<void>;


    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        if (!Auth.getAuthInfo(Auth.accessTokenKey) || !Auth.getAuthInfo(Auth.refreshTokenKey)) {
            this.openNewRoute('/signup').then();
        }

    }


    static async getOperations(dateFrom:string, dateTo:string, openNewRoute: (url: string) => Promise<void>) {
        const result = await CustomHttp.request('/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo);

        if (result) {
            if (result.redirect) {
                return openNewRoute(result.redirect);
            }
            if (result.error || !result.response || (result.response as DefaultResponseType).error) {
                return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
            }
        }

        const items:GetOperationType[] | [] = (result.response as GetOperationType[]);
        const incomes:GetOperationType[] | [] = items.filter(item => item.category && item.type === 'income');
        const expenses:GetOperationType[] | [] = items.filter(item => item.category && item.type === 'expense');
        const incomesRes: PlotOperationsType[] | [] = this.getItems(incomes);
        const expensesRes: PlotOperationsType[] | [] = this.getItems(expenses);
        let incomePlotCategory:string[] = [];
        let incomePlotAmount:string[] = []
        let expensePlotCategory:string[] = [];
        let expensePlotAmount:string[] = [];


        incomesRes.forEach(item => {
            incomePlotCategory.push(item.category);
            incomePlotAmount.push(item.amount.toString());
        });
        expensesRes.forEach(item => {
            expensePlotCategory.push(item.category);
            expensePlotAmount.push(item.amount.toString());
        });


        this.getChart(incomePlotCategory, incomePlotAmount, expensePlotCategory, expensePlotAmount);

    }

    static getChart(incomePlotCategory:string[], incomePlotAmount:string[], expensePlotCategory:string[], expensePlotAmount:string[]) {

        // chart JS
        let chartIncome:any = Chart.getChart('myChartIncome');
        if (chartIncome) {
            chartIncome.destroy();
        }

        const ctxIncome: HTMLElement | ChartItem | null = document.getElementById('myChartIncome');
        if (ctxIncome) {
            ctxIncome.innerHTML = ' ';
        }


        chartIncome = new Chart((ctxIncome as ChartItem), {
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
        let chartExpense:any = Chart.getChart('myChartExpense');
        if (chartExpense) {
            chartExpense.destroy();
        }
        const ctxExpense: HTMLElement | ChartItem | null = document.getElementById('myChartExpense');
        if (ctxExpense) {
            ctxExpense.innerHTML = ' ';
        }

        chartExpense = new Chart((ctxExpense as ChartItem), {
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


    static getItems(items:GetOperationType[] | []):PlotOperationsType[] | [] {

        const resObj = items.reduce((acc:any, record) => {
            const { category, amount } = record;
            if (!acc[category]) acc[category] = { amount: 0};
            acc[category].amount += Number(amount);
            acc[category].category = category;
            return acc;
        }, {});
        const res = Object.values(resObj);

        return (res as PlotOperationsType[] | []);

    }

}


