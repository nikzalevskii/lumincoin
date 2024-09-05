import {CustomHttp} from "../../../services/custom-http";
import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesMonth {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const date = new Date(), y = date.getFullYear(), m = date.getMonth();

        const firstDayMonth = new Date(y, m, 2).toISOString().slice(0, 10);
        const lastDayMonth = new Date(y, m + 1, 1).toISOString().slice(0, 10);

        document.getElementById('month').classList.add('flow-period-active');
        document.getElementById('week').classList.remove('flow-period-active');
        document.getElementById('today').classList.remove('flow-period-active');
        document.getElementById('year').classList.remove('flow-period-active');
        document.getElementById('all-period').classList.remove('flow-period-active');
        document.getElementById('interval').classList.remove('flow-period-active');

        IncomeAndExpensesPeriods.getOperations(firstDayMonth, lastDayMonth, this.openNewRoute).then();

    }

}