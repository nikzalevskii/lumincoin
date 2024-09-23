import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesAllPeriod {
    public openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        const startAllPeriod:string = '0000-01-01';
        const finishAllPeriod:string = '9999-12-31';

        const allPeriodEl:HTMLElement | null =  document.getElementById('all-period');
        const monthPeriodEl:HTMLElement | null =  document.getElementById('month');
        const weekPeriodEl:HTMLElement | null =  document.getElementById('week');
        const todayPeriodEl:HTMLElement | null =  document.getElementById('today');
        const yearPeriodEl:HTMLElement | null =     document.getElementById('year');
        const intervalPeriodEl:HTMLElement | null =   document.getElementById('interval');

        if (allPeriodEl && monthPeriodEl && weekPeriodEl && todayPeriodEl && yearPeriodEl && intervalPeriodEl) {
            allPeriodEl.classList.add('flow-period-active');
            monthPeriodEl.classList.remove('flow-period-active');
            weekPeriodEl.classList.remove('flow-period-active');
            todayPeriodEl.classList.remove('flow-period-active');
            yearPeriodEl.classList.remove('flow-period-active');
            intervalPeriodEl.classList.remove('flow-period-active');
        }


        IncomeAndExpensesPeriods.getOperations(startAllPeriod, finishAllPeriod, this.openNewRoute).then();

    }

}