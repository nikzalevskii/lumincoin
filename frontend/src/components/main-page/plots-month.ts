import {PlotPeriods} from "./plot-periods";

export class PlotsMonth {
    openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        const date = new Date(), y:number = date.getFullYear(), m:number = date.getMonth();

        const firstDayMonth:string = new Date(y, m, 2).toISOString().slice(0, 10);
        const lastDayMonth:string = new Date(y, m + 1, 1).toISOString().slice(0, 10);

        const todayMainEl:HTMLElement | null =  document.getElementById('today-main');
        const weekMainEl:HTMLElement | null =  document.getElementById('week-main');
        const monthMainEl:HTMLElement | null = document.getElementById('month-main');
        const yearMainEl:HTMLElement | null =  document.getElementById('year-main');
        const allPeriodMainEl:HTMLElement | null =   document.getElementById('all-period-main');
        const intervalMainEl:HTMLElement | null = document.getElementById('interval-main');

        if (todayMainEl && weekMainEl && monthMainEl && yearMainEl && allPeriodMainEl && intervalMainEl) {
            monthMainEl.classList.add('flow-period-active');
            weekMainEl.classList.remove('flow-period-active');
            todayMainEl.classList.remove('flow-period-active');
            yearMainEl.classList.remove('flow-period-active');
            allPeriodMainEl.classList.remove('flow-period-active');
            intervalMainEl.classList.remove('flow-period-active');
        }



        PlotPeriods.getOperations(firstDayMonth, lastDayMonth,  this.openNewRoute).then();

    }



}

