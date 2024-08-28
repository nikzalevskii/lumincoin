import {CustomHttp} from "../../../services/custom-http";
import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesYear {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const firstDayYear = new Date(y, 0, 2).toISOString().slice(0, 10);
        const lastDayYear = new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);

        document.getElementById('year').classList.add('flow-period-active');
        document.getElementById('month').classList.remove('flow-period-active');
        document.getElementById('week').classList.remove('flow-period-active');
        document.getElementById('today').classList.remove('flow-period-active');
        document.getElementById('all-period').classList.remove('flow-period-active');
        document.getElementById('interval').classList.remove('flow-period-active');

        IncomeAndExpensesPeriods.getOperations(firstDayYear, lastDayYear, this.openNewRoute).then();

    }

}