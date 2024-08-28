import moment from "moment";
import {PlotPeriods} from "./plot-periods";

export class PlotsInterval {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('interval-main').classList.add('flow-period-active');
        document.getElementById('all-period-main').classList.remove('flow-period-active');
        document.getElementById('month-main').classList.remove('flow-period-active');
        document.getElementById('week-main').classList.remove('flow-period-active');
        document.getElementById('today-main').classList.remove('flow-period-active');
        document.getElementById('year-main').classList.remove('flow-period-active');


        let pickerFrom = new Pikaday({
            field: document.getElementById('dateFrom-main'),
            format: 'D MMM YYYY',
            onSelect: function() {
                // console.log(this.getMoment().format('YYYY-MM-DD'));
            }
        });
        let pickerTo = new Pikaday({
            field: document.getElementById('dateTo-main'),
            format: 'D MMM YYYY',
            onSelect: function() {
                // console.log(this.getMoment().format('YYYY-MM-DD'));
            }
        });

        this.dateFrom = null;
        this.dateTo = null;
        document.getElementById('dateFrom-main').addEventListener('change', () => {
            console.log(pickerFrom.getMoment().format('YYYY-MM-DD'));
            this.dateFrom = pickerFrom.getMoment().format('YYYY-MM-DD');
            if (this.dateFrom && this.dateTo) {
                console.log(this.dateFrom);
                console.log(this.dateTo);
                PlotPeriods.getOperations(this.dateFrom, this.dateTo, openNewRoute).then();
            }
        })
        document.getElementById('dateTo-main').addEventListener('change', () => {
            console.log(pickerTo.getMoment().format('YYYY-MM-DD'));
            this.dateTo = pickerTo.getMoment().format('YYYY-MM-DD');
            if (this.dateFrom && this.dateTo) {
                console.log(this.dateFrom);
                console.log(this.dateTo);
                PlotPeriods.getOperations(this.dateFrom, this.dateTo, openNewRoute).then();
            }
        })

        // console.log(this.dateFrom);
        // console.log(this.dateTo);



    }
}