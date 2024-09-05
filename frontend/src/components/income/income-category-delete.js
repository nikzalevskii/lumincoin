import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";

export class IncomeCategoryDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.startAllPeriod = '0000-01-01';
        this.finishAllPeriod = '9999-12-31';

        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            return this.openNewRoute('/');
        }

        document.getElementById('income-wrap').style.display = 'block';
        document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';

        document.getElementById('income-category-delete-popup').addEventListener('click', this.deleteIncomeItemsAndCategory.bind(this));

    }



    async deleteIncomeItemsAndCategory() {
        const result = await CustomHttp.request('/categories/income');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
            }
        }
        const category = result.response.find(item => parseInt(item.id) === parseInt(this.id));
        const items = await this.getItems(this.startAllPeriod, this.finishAllPeriod, this.openNewRoute);
        const incomesItemsToDelete = items.filter(item => item.category === category.title);
        for (const item of incomesItemsToDelete) {
            const result = await CustomHttp.request('/operations/' + item.id, 'DELETE', true);

            if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
                alert('Возникла ошибка при удалении дохода/расхода. Обратитесь в поддержку');
                this.openNewRoute('/');
            }
        }
        await this.deleteCategory();
    }

    async deleteCategory() {
        const result = await CustomHttp.request('/categories/income/' + this.id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            alert('Возникла ошибка при удалении дохода. Обратитесь в поддержку');
            this.openNewRoute('/');
        }
        this.openNewRoute('/income');
    }

    async getItems(dateFrom, dateTo, openNewRoute) {
        const result = await CustomHttp.request('/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        if (result) {
            if (result.redirect) {
                return openNewRoute(result.redirect);
            }
            if (result.error || !result.response || result.response.error) {
                return alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
            }
        }

        return result.response
    }
}