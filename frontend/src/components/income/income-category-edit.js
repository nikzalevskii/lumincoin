import {CustomHttp} from "../../services/custom-http";
import {UrlUtils} from "../../utils/url-utils";

export class IncomeCategoryEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.incomeValueInput = document.getElementById('category-income-value');
        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            return this.openNewRoute('/');
        }
        console.log(this.id);

        // this.editCategory().then();

        this.getIncome().then();
        document.getElementById('save-category-income').addEventListener('click', this.editCategory.bind(this));


        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this))
        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this));

        // console.log('INCOME-CREATE')
    }

    async editCategory() {
        console.log(this.incomeValueInput.value);
        const result = await CustomHttp.request('/categories/income/' + this.id, 'PUT', true, {
            title: this.incomeValueInput.value,
        });

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            alert('Возникла ошибка при редактировании дохода. Обратитесь в поддержку');
            this.openNewRoute('/');
        }
        console.log(result);
        console.log(result.response);
        this.openNewRoute('/income');
    }

    async getIncome() {
        const result = await CustomHttp.request('/categories/income/' + this.id);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе дохода. Обратитесь в поддержку');
            }
            this.incomeValueInput.value = result.response.title;
        }
        return result.response;

    }


    async toIncome() {
        await this.openNewRoute('/income');
    }

    async toExpense() {
        await this.openNewRoute('/expense');
    }


}
