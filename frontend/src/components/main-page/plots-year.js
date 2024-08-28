import {CustomHttp} from "../../services/custom-http";
import {PlotPeriods} from "./plot-periods";

export class PlotsYear {
    constructor() {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const firstDayYear = new Date(y, 0, 2).toISOString().slice(0, 10);
        const lastDayYear = new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);

        document.getElementById('year-main').classList.add('flow-period-active');
        document.getElementById('month-main').classList.remove('flow-period-active');
        document.getElementById('week-main').classList.remove('flow-period-active');
        document.getElementById('today-main').classList.remove('flow-period-active');
        document.getElementById('all-period-main').classList.remove('flow-period-active');
        document.getElementById('interval-main').classList.remove('flow-period-active');

        PlotPeriods.getOperations(firstDayYear, lastDayYear,  this.openNewRoute);

    }



}

