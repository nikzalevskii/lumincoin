import {CustomHttp} from "../../services/custom-http";
import {IncomeAndExpensesPeriods} from "./period/income-and-expenses-periods";

export class IncomesAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const today = new Date(y, m, date.getDate() + 1).toISOString().slice(0, 10);

        document.getElementById('today').classList.add('flow-period-active');
        document.getElementById('week').classList.remove('flow-period-active');
        document.getElementById('month').classList.remove('flow-period-active');
        document.getElementById('year').classList.remove('flow-period-active');
        document.getElementById('all-period').classList.remove('flow-period-active');
        document.getElementById('interval').classList.remove('flow-period-active');


        IncomeAndExpensesPeriods.getOperations(today, today, this.openNewRoute).then();


    }

    async findCategory(type, id) {
        const result = await CustomHttp.request('/categories/' + type);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
            }
        }
        return result.response.find(title => title.id === id).title;
    }
}