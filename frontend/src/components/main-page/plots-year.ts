import {PlotPeriods} from "./plot-periods";

export class PlotsYear {
    openNewRoute: (url: string) => Promise<void>;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        const date:Date = new Date(), y = date.getFullYear();
        const firstDayYear:string = new Date(y, 0, 2).toISOString().slice(0, 10);
        const lastDayYear:string = new Date(y, 11, 32).toISOString().slice(0, 10);

        const todayMainEl:HTMLElement | null =  document.getElementById('today-main');
        const weekMainEl:HTMLElement | null =  document.getElementById('week-main');
        const monthMainEl:HTMLElement | null = document.getElementById('month-main');
        const yearMainEl:HTMLElement | null =  document.getElementById('year-main');
        const allPeriodMainEl:HTMLElement | null =   document.getElementById('all-period-main');
        const intervalMainEl:HTMLElement | null = document.getElementById('interval-main');

        if (todayMainEl && weekMainEl && monthMainEl && yearMainEl && allPeriodMainEl && intervalMainEl) {
            yearMainEl.classList.add('flow-period-active');
            monthMainEl.classList.remove('flow-period-active');
            weekMainEl.classList.remove('flow-period-active');
            todayMainEl.classList.remove('flow-period-active');
            allPeriodMainEl.classList.remove('flow-period-active');
            intervalMainEl.classList.remove('flow-period-active');

        }



        PlotPeriods.getOperations(firstDayYear, lastDayYear,  this.openNewRoute).then();

    }



}

