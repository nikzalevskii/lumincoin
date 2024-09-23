import {PlotPeriods} from "./plot-periods";

export class PlotsAllPeriod {
    openNewRoute: (url: string) => Promise<void>
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        const startAllPeriod:string = '0000-01-01';
        const finishAllPeriod:string = '9999-12-31';

        const todayMainEl:HTMLElement | null =  document.getElementById('today-main');
        const weekMainEl:HTMLElement | null =  document.getElementById('week-main');
        const monthMainEl:HTMLElement | null = document.getElementById('month-main');
        const yearMainEl:HTMLElement | null =  document.getElementById('year-main');
        const allPeriodMainEl:HTMLElement | null =   document.getElementById('all-period-main');
        const intervalMainEl:HTMLElement | null = document.getElementById('interval-main');

        if (todayMainEl && weekMainEl && monthMainEl && yearMainEl && allPeriodMainEl && intervalMainEl) {
            allPeriodMainEl.classList.add('flow-period-active');
            monthMainEl.classList.remove('flow-period-active');
            weekMainEl.classList.remove('flow-period-active');
            todayMainEl.classList.remove('flow-period-active');
            yearMainEl.classList.remove('flow-period-active');
            intervalMainEl.classList.remove('flow-period-active');
        }



        PlotPeriods.getOperations(startAllPeriod, finishAllPeriod, this.openNewRoute).then();

    }



}

