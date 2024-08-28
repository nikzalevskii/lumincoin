import {PlotPeriods} from "../../main-page/plot-periods";
import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesInterval {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('interval-dates').style.display = 'flex';

        document.getElementById('interval').classList.add('flow-period-active');
        document.getElementById('today').classList.remove('flow-period-active');
        document.getElementById('week').classList.remove('flow-period-active');
        document.getElementById('month').classList.remove('flow-period-active');
        document.getElementById('year').classList.remove('flow-period-active');
        document.getElementById('all-period').classList.remove('flow-period-active');

        let pickerFrom = new Pikaday({
            field: document.getElementById('dateFrom'),
            format: 'D MMM YYYY',
            onSelect: function() {
                // console.log(this.getMoment().format('YYYY-MM-DD'));
            }
        });
        let pickerTo = new Pikaday({
            field: document.getElementById('dateTo'),
            format: 'D MMM YYYY',
            onSelect: function() {
                // console.log(this.getMoment().format('YYYY-MM-DD'));
            }
        });

        this.dateFrom = null;
        this.dateTo = null;
        document.getElementById('dateFrom').addEventListener('change', () => {
            console.log(pickerFrom.getMoment().format('YYYY-MM-DD'));
            this.dateFrom = pickerFrom.getMoment().format('YYYY-MM-DD');
            if (this.dateFrom && this.dateTo) {
                console.log(this.dateFrom);
                console.log(this.dateTo);
                IncomeAndExpensesPeriods.getOperations(this.dateFrom, this.dateTo, this.openNewRoute).then();
            }
        })
        document.getElementById('dateTo').addEventListener('change', () => {
            console.log(pickerTo.getMoment().format('YYYY-MM-DD'));
            this.dateTo = pickerTo.getMoment().format('YYYY-MM-DD');
            if (this.dateFrom && this.dateTo) {
                console.log(this.dateFrom);
                console.log(this.dateTo);
                IncomeAndExpensesPeriods.getOperations(this.dateFrom, this.dateTo, this.openNewRoute).then();
            }
        })

        // this.getData().then();
    }

    // async getData(){
    //     if (this.dateFrom && this.dateTo) {
    //         IncomeAndExpensesPeriods.getOperations(this.dateFrom, this.dateTo, this.openNewRoute).then();
    //     }
    // }


}