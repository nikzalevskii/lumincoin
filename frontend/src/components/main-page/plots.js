import {CustomHttp} from "../../services/custom-http";
import {PlotPeriods} from "./plot-periods";
import {Auth} from "../../services/auth";

export class Plots {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!Auth.getUserInfo(Auth.accessTokenKey) || !Auth.getUserInfo(Auth.refreshTokenKey)) {
            this.openNewRoute('/signup').then();
        }
        this.date = new Date();
        const y = this.date.getFullYear();
        const m = this.date.getMonth();
        this.today = new Date(y, m, this.date.getDate() + 1).toISOString().slice(0, 10);

        document.getElementById('today-main').classList.add('flow-period-active');
        document.getElementById('week-main').classList.remove('flow-period-active');
        document.getElementById('month-main').classList.remove('flow-period-active');
        document.getElementById('year-main').classList.remove('flow-period-active');
        document.getElementById('all-period-main').classList.remove('flow-period-active');
        document.getElementById('interval-main').classList.remove('flow-period-active');

        // this.getOperations(this.today, this.today);
        if (Auth.getUserInfo(Auth.accessTokenKey) && Auth.getUserInfo(Auth.refreshTokenKey)) {
            PlotPeriods.getOperations(this.today, this.today,  this.openNewRoute);
        }


    }



}

