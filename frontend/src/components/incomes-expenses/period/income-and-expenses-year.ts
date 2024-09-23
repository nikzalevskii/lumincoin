import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesYear {
    public openNewRoute: (url: string) => Promise<void>;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        const date:Date = new Date(), y:number = date.getFullYear();
        const firstDayYear:string = new Date(y, 0, 2).toISOString().slice(0, 10);
        const lastDayYear:string = new Date(y, 11, 32).toISOString().slice(0, 10);

        const allPeriodEl:HTMLElement | null = document.getElementById('all-period');
        const monthPeriodEl:HTMLElement | null = document.getElementById('month');
        const weekPeriodEl:HTMLElement | null = document.getElementById('week');
        const todayPeriodEl:HTMLElement | null = document.getElementById('today');
        const yearPeriodEl:HTMLElement | null = document.getElementById('year');
        const intervalPeriodEl:HTMLElement | null = document.getElementById('interval');

        if (allPeriodEl && monthPeriodEl && weekPeriodEl && todayPeriodEl && yearPeriodEl && intervalPeriodEl) {
            yearPeriodEl.classList.add('flow-period-active');
            monthPeriodEl.classList.remove('flow-period-active');
            weekPeriodEl.classList.remove('flow-period-active');
            todayPeriodEl.classList.remove('flow-period-active');
            allPeriodEl.classList.remove('flow-period-active');
            intervalPeriodEl.classList.remove('flow-period-active');

        }


        IncomeAndExpensesPeriods.getOperations(firstDayYear, lastDayYear, this.openNewRoute).then();

    }

}