import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";

export class IncomeExpensesEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.findElements();

        if (!this.id) {
            return this.openNewRoute('/');
        }

        this.getItem().then();

        document.getElementById('item-create-new-btn').addEventListener('click', this.editItem.bind(this));

    }

    findElements() {
        this.typeSelect = document.getElementById('item-create-type');
        this.categorySelect = document.getElementById('item-create-category');
        this.amountInput = document.getElementById('item-create-amount');
        this.dateInput = document.getElementById('item-create-date');
        this.commentInput = document.getElementById('item-create-comment');
        this.id = UrlUtils.getUrlParam('id');
    }

    async editItem() {
        if (this.validateForm()) {

            let body = {};
            body.type = this.typeSelect.options[this.typeSelect.selectedIndex].value;
            if (!this.amountInput.value) {
                alert('Необходимо ввести сумму. Попробуйте снова');
                return;
            }
            body.amount = parseInt(this.amountInput.value);
            if (!this.dateInput.value) {
                alert('Необходимо выбрать дату. Попробуйте снова');
                return;
            }
            body.date = this.dateInput.value;
            body.comment = this.commentInput.value ? this.commentInput.value : ' ';
            if (!this.categorySelect.value || this.categorySelect.value === '-- Выберите категорию --') {
                alert('Необходимо выбрать категорию. Попробуйте снова');
                // this.openNewRoute('/incomes-expenses');
                return;
            }
            body.category_id = parseInt(this.categorySelect.value);

            const result = await CustomHttp.request('/operations/' + this.id, 'PUT', true, body)


            if (result) {
                // if (result.error || !result.response || (result.response && !result.response.id || !result.response.type || !result.response.amount || !result.response.date || !result.response.comment || !result.response.category)) {
                if (result.error || !result.response) {
                    alert('Ошибка в редактировании дохода/расхода');
                    this.openNewRoute('/');
                    return;
                }
                this.openNewRoute('/incomes-expenses');

            }
        }

    }

    validateForm() {
        let validate = true;
        if (!this.amountInput.value || !this.amountInput.value.match(/^\d+$/)) {
            validate = false;
        }
        return validate;
    }

    async getItem() {
        const result = await CustomHttp.request('/operations/' + this.id);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || result.response.error || !result.response) {
                return alert('Возникла ошибка при запросе дохода/расхода. Обратитесь в поддержку');
            }
        }
        const item = result.response;

        this.showItem(item);
    }


    async showItem(item) {
        let categories = await this.findCategory(item.type);
        await this.addCategory(categories);
        this.typeSelect.value = item.type;
        const selectedCategory = categories.find(category => category.title === item.category);
        this.categorySelect.value = selectedCategory.id;

        this.amountInput.value = item.amount;
        this.dateInput.value = item.date;
        this.commentInput.value = item.comment;


        document.getElementById('item-create-type').addEventListener('change', async () => {
            this.typeSelectValue = this.typeSelect.options[this.typeSelect.selectedIndex].value;
            categories = await this.findCategory(this.typeSelect.value);
            await this.addCategory(categories);
        });


    }


    async findCategory(type) {
        if (type) {
            const result = await CustomHttp.request('/categories/' + type);
            if (result) {
                if (result.redirect) {
                    return this.openNewRoute(result.redirect);
                }
                if (result.error || result.response.error || !result.response) {
                    return alert('Возникла ошибка при запросе категорий. Обратитесь в поддержку');
                }
            }
            return result.response;
        }
    }

    //
    async addCategory(categories) {
        const categoryBlock = document.getElementById('item-create-category');
        categoryBlock.innerHTML = '';
        const option = document.createElement('option');
        option.innerText = '-- Выберите категорию --';
        categoryBlock.appendChild(option);
        if (categories) {
            for (let i = 0; i < categories.length; i++) {
                const option = document.createElement('option');
                option.innerText = categories[i].title;
                option.value = categories[i].id;
                categoryBlock.appendChild(option);
            }
        }
    }


}

