import {CustomHttp} from "../../services/custom-http";
import {PlotPeriods} from "./plot-periods";

export class PlotsWeek {
    constructor() {
        // this.date = new Date();
        // const y = this.date.getFullYear();
        // const m = this.date.getMonth();
        // this.today = new Date(y, m, this.date.getDate() + 1).toISOString().slice(0, 10);

        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const dayAtWeek = date.getDay() - 1;
        const dayLastAtWeek = 7 - date.getDay();
        // const firstDayWeek =  new Date(y, m, date.getDate() - dayAtWeek + 1).toISOString().slice(0, 10);
        const firstDayWeek =  new Date(y, m, date.getDate() - dayAtWeek + 1).toISOString().slice(0, 10);
        // const lastDayWeek =  new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);
        const lastDayWeek =  new Date(y, m, date.getDate() + 1 + dayLastAtWeek).toISOString().slice(0, 10);

        document.getElementById('week-main').classList.add('flow-period-active');
        document.getElementById('today-main').classList.remove('flow-period-active');
        document.getElementById('month-main').classList.remove('flow-period-active');
        document.getElementById('year-main').classList.remove('flow-period-active');
        document.getElementById('all-period-main').classList.remove('flow-period-active');

        // this.getOperations(this.today, this.today);
        console.log(firstDayWeek);
        console.log(lastDayWeek);

        PlotPeriods.getOperations(firstDayWeek, lastDayWeek);

    }



}

