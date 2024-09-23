import {PlotPeriods} from "./plot-periods";
import {Auth} from "../../services/auth";

export class Plots {
    openNewRoute: (url: string) => Promise<void>;
    date:string | Date;
    today:string | Date;


    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        if (!Auth.getAuthInfo(Auth.accessTokenKey) || !Auth.getAuthInfo(Auth.refreshTokenKey)) {
            this.openNewRoute('/signup').then();
        }
        this.date = new Date();
        const y:number = this.date.getFullYear();
        const m:number = this.date.getMonth();
        this.today = new Date(y, m, this.date.getDate() + 1).toISOString().slice(0, 10);

        const todayMainEl:HTMLElement | null =  document.getElementById('today-main');
        const weekMainEl:HTMLElement | null =  document.getElementById('week-main');
        const monthMainEl:HTMLElement | null = document.getElementById('month-main');
        const yearMainEl:HTMLElement | null =  document.getElementById('year-main');
        const allPeriodMainEl:HTMLElement | null =   document.getElementById('all-period-main');
        const intervalMainEl:HTMLElement | null = document.getElementById('interval-main');

        if (todayMainEl && weekMainEl && monthMainEl && yearMainEl && allPeriodMainEl && intervalMainEl) {
            todayMainEl.classList.add('flow-period-active');
            weekMainEl.classList.remove('flow-period-active');
            monthMainEl.classList.remove('flow-period-active');
            yearMainEl.classList.remove('flow-period-active');
            allPeriodMainEl.classList.remove('flow-period-active');
            intervalMainEl.classList.remove('flow-period-active');
        }


        if (Auth.getAuthInfo(Auth.accessTokenKey) && Auth.getAuthInfo(Auth.refreshTokenKey)) {
            PlotPeriods.getOperations(this.today, this.today, this.openNewRoute).then();
        }

    }


}

