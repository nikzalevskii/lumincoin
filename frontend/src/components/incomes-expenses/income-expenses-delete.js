import {CustomHttp} from "../../services/custom-http";
import {UrlUtils} from "../../utils/url-utils";

export class IncomeExpensesDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            return this.openNewRoute('/');
        }

        this.deleteItem().then();

    }

    async deleteItem() {
        const result = await CustomHttp.request('/operations/' + this.id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            alert('Возникла ошибка при удалении дохода/расхода. Обратитесь в поддержку');
            this.openNewRoute('/');
        }
        this.openNewRoute('/incomes-expenses');
    }

}