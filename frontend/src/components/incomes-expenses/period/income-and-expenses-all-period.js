import {CustomHttp} from "../../../services/custom-http";
import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesAllPeriod {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const startAllPeriod = '0000-01-01';
        const finishAllPeriod = '9999-12-31';

        document.getElementById('all-period').classList.add('flow-period-active');
        document.getElementById('month').classList.remove('flow-period-active');
        document.getElementById('week').classList.remove('flow-period-active');
        document.getElementById('today').classList.remove('flow-period-active');
        document.getElementById('year').classList.remove('flow-period-active');
        document.getElementById('interval').classList.remove('flow-period-active');

        // this.getOperations(startAllPeriod, finishAllPeriod).then();
        IncomeAndExpensesPeriods.getOperations(startAllPeriod, finishAllPeriod, this.openNewRoute).then();

    }

}