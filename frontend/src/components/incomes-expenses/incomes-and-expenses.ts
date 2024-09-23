import {IncomeAndExpensesPeriods} from "./period/income-and-expenses-periods";

export class IncomesAndExpenses {
    public openNewRoute: (url: string) => Promise<void>;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        const date:Date = new Date(), y:number = date.getFullYear(), m:number = date.getMonth();
        const today:string = new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);


        const todayEl:HTMLElement | null = document.getElementById('today');
        const weekEl:HTMLElement | null = document.getElementById('week');
        const monthEl:HTMLElement | null = document.getElementById('month');
        const yearEl:HTMLElement | null = document.getElementById('year');
        const allPeriodEl:HTMLElement | null = document.getElementById('all-period');
        const intervalEl:HTMLElement | null = document.getElementById('interval');

        if (todayEl && weekEl && monthEl && yearEl && allPeriodEl && intervalEl) {
            todayEl.classList.add('flow-period-active');
            weekEl.classList.remove('flow-period-active');
            monthEl.classList.remove('flow-period-active');
            yearEl.classList.remove('flow-period-active');
            allPeriodEl.classList.remove('flow-period-active');
            intervalEl.classList.remove('flow-period-active');
        }

        IncomeAndExpensesPeriods.getOperations(today, today, this.openNewRoute).then();


    }

}