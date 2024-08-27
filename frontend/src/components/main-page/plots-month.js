import {CustomHttp} from "../../services/custom-http";
import {PlotPeriods} from "./plot-periods";

export class PlotsMonth {
    constructor() {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();

        const firstDayMonth = new Date(y, m, 2).toISOString().slice(0, 10);
        const lastDayMonth = new Date(y, m + 1, 1).toISOString().slice(0, 10);

        document.getElementById('month-main').classList.add('flow-period-active');
        document.getElementById('week-main').classList.remove('flow-period-active');
        document.getElementById('today-main').classList.remove('flow-period-active');
        document.getElementById('year-main').classList.remove('flow-period-active');
        document.getElementById('all-period-main').classList.remove('flow-period-active');

        PlotPeriods.getOperations(firstDayMonth, lastDayMonth);

    }



}

