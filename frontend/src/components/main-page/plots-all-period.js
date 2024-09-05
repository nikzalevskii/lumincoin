import {CustomHttp} from "../../services/custom-http";
import {PlotPeriods} from "./plot-periods";

export class PlotsAllPeriod {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const startAllPeriod = '0000-01-01';
        const finishAllPeriod = '9999-12-31';

        document.getElementById('all-period-main').classList.add('flow-period-active');
        document.getElementById('month-main').classList.remove('flow-period-active');
        document.getElementById('week-main').classList.remove('flow-period-active');
        document.getElementById('today-main').classList.remove('flow-period-active');
        document.getElementById('year-main').classList.remove('flow-period-active');
        document.getElementById('interval-main').classList.remove('flow-period-active');

        PlotPeriods.getOperations(startAllPeriod, finishAllPeriod, this.openNewRoute);
        // PlotPeriods.getAllOperations(this.openNewRoute);

    }



}

