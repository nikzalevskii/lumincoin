import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";

export class IncomeCategoryDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            return this.openNewRoute('/');
        }
        console.log(this.id);

        document.getElementById('income-popup').style.display = 'block';
        document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';

        document.getElementById('income-category-delete-popup').addEventListener('click', this.deleteCategory.bind(this));

    }

    async deleteCategory() {
        const result = await CustomHttp.request('/categories/income/' + this.id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            alert('Возникла ошибка при удалении дохода. Обратитесь в поддержку');
            this.openNewRoute('/');
        }
        console.log(result);
        console.log(result.response);
        this.openNewRoute('/income');
    }
}