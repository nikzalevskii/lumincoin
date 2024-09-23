import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesWeek {
    public openNewRoute: (url: string) => Promise<void>;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        const date:Date = new Date(), y:number = date.getFullYear(), m:number = date.getMonth();
        const dayAtWeek:number = date.getDay() - 1;
        const dayLastAtWeek:number = 7 - date.getDay();
        const firstDayWeek:string =  new Date(y, m, date.getDate() - dayAtWeek + 1).toISOString().slice(0, 10);
        const lastDayWeek:string =  new Date(y, m, date.getDate() + 1 + dayLastAtWeek).toISOString().slice(0, 10);


        const allPeriodEl:HTMLElement | null =  document.getElementById('all-period');
        const monthPeriodEl:HTMLElement | null =  document.getElementById('month');
        const weekPeriodEl:HTMLElement | null =  document.getElementById('week');
        const todayPeriodEl:HTMLElement | null =  document.getElementById('today');
        const yearPeriodEl:HTMLElement | null =     document.getElementById('year');
        const intervalPeriodEl:HTMLElement | null =   document.getElementById('interval');

        if (allPeriodEl && monthPeriodEl && weekPeriodEl && todayPeriodEl && yearPeriodEl && intervalPeriodEl) {
            weekPeriodEl.classList.add('flow-period-active');
            todayPeriodEl.classList.remove('flow-period-active');
            monthPeriodEl.classList.remove('flow-period-active');
            yearPeriodEl.classList.remove('flow-period-active');
            allPeriodEl.classList.remove('flow-period-active');
            intervalPeriodEl.classList.remove('flow-period-active');
        }


        IncomeAndExpensesPeriods.getOperations(firstDayWeek, lastDayWeek, this.openNewRoute).then();

    }

}