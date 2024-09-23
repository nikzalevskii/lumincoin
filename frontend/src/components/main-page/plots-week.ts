import {PlotPeriods} from "./plot-periods";

export class PlotsWeek {
    openNewRoute: (url: string) => Promise<void>;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const dayAtWeek:number = date.getDay() - 1;
        const dayLastAtWeek:number = 7 - date.getDay();
        const firstDayWeek:string = new Date(y, m, date.getDate() - dayAtWeek + 1).toISOString().slice(0, 10);
        const lastDayWeek:string = new Date(y, m, date.getDate() + 1 + dayLastAtWeek).toISOString().slice(0, 10);

        const todayMainEl:HTMLElement | null = document.getElementById('today-main');
        const weekMainEl:HTMLElement | null = document.getElementById('week-main');
        const monthMainEl:HTMLElement | null = document.getElementById('month-main');
        const yearMainEl:HTMLElement | null = document.getElementById('year-main');
        const allPeriodMainEl:HTMLElement | null = document.getElementById('all-period-main');
        const intervalMainEl:HTMLElement | null = document.getElementById('interval-main');

        if (todayMainEl && weekMainEl && monthMainEl && yearMainEl && allPeriodMainEl && intervalMainEl) {
            weekMainEl.classList.add('flow-period-active');
            todayMainEl.classList.remove('flow-period-active');
            monthMainEl.classList.remove('flow-period-active');
            yearMainEl.classList.remove('flow-period-active');
            allPeriodMainEl.classList.remove('flow-period-active');
            intervalMainEl.classList.remove('flow-period-active');
        }

        PlotPeriods.getOperations(firstDayWeek, lastDayWeek, this.openNewRoute).then();

    }


}

