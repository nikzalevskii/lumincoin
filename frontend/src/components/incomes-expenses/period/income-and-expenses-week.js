import {CustomHttp} from "../../../services/custom-http";
import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";

export class IncomeAndExpensesWeek {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const dayAtWeek = date.getDay() - 1;
        const dayLastAtWeek = 7 - date.getDay();
        // const firstDayWeek =  new Date(y, m, date.getDate() - dayAtWeek + 1).toISOString().slice(0, 10);
        const firstDayWeek =  new Date(y, m, date.getDate() - dayAtWeek + 1).toISOString().slice(0, 10);
        // const lastDayWeek =  new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);
        const lastDayWeek =  new Date(y, m, date.getDate() + 1 + dayLastAtWeek).toISOString().slice(0, 10);

        document.getElementById('week').classList.add('flow-period-active');
        document.getElementById('today').classList.remove('flow-period-active');
        document.getElementById('month').classList.remove('flow-period-active');
        document.getElementById('year').classList.remove('flow-period-active');
        document.getElementById('all-period').classList.remove('flow-period-active');

        // console.log(dayAtWeek);
        // console.log(daylastAtWeek);
        // console.log(firstDayWeek);
        // console.log(lastDayWeek);

        IncomeAndExpensesPeriods.getOperations(firstDayWeek, lastDayWeek, this.openNewRoute).then();

    }

}