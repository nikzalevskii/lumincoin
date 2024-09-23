import {CustomHttp} from "../../services/custom-http";
import {UrlUtils} from "../../utils/url-utils";
import {DefaultResponseType} from "../../types/default-response.type";
import {HttpResultType} from "../../types/http-result.type";

export class IncomeExpensesDelete {
    public openNewRoute: (url: string) => Promise<void>;
    public id: string | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            this.openNewRoute('/').then();
            return;
        }

        this.deleteItem().then();

    }

    async deleteItem():Promise<void> {
        const result:HttpResultType = await CustomHttp.request('/operations/' + this.id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && ((result.response as DefaultResponseType).error))) {
            alert('Возникла ошибка при удалении дохода/расхода. Обратитесь в поддержку');
            await this.openNewRoute('/');
        }
        await this.openNewRoute('/incomes-expenses');
    }

}