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
            console.log('10/02/1993');
            console.log(this.typeSelect.options[this.typeSelect.selectedIndex].value);
            console.log(this.amountInput.value);
            console.log(this.dateInput.value);
            console.log(this.commentInput.value);
            console.log(parseInt(this.categorySelect.value));



            const result = await CustomHttp.request('/operations/' + this.id, 'PUT', true, {
                type: this.typeSelect.options[this.typeSelect.selectedIndex].value,
                amount: this.amountInput.value,
                date: this.dateInput.value,
                comment: this.commentInput.value ? this.commentInput.value : ' ',
                category_id: parseInt(this.categorySelect.value),
            });

            if (result) {
                console.log(result);
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
        // console.log(result.response);
        // return result.response;
        const item = result.response;

        this.showItem(item);
    }


    async showItem(item) {
        // this.typeSelect.options[this.typeSelect.selectedIndex].value = item.amount;
        const categories = await this.findCategory(item.type);
        await this.addCategory(categories);
        this.typeSelect.value = item.type;
        const selectedCategory = categories.find(category => category.title === item.category);
        // console.log(selectedCategory);
        this.categorySelect.value = selectedCategory.id;

        this.amountInput.value = item.amount;
        this.dateInput.value = item.date;
        this.commentInput.value = item.comment;


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
        if (categories) {
            for (let i = 0; i < categories.length; i++) {
                const option = document.createElement('option');
                option.innerText = categories[i].title;
                option.value = categories[i].id;
                categoryBlock.appendChild(option);
            }
        } else {
            categoryBlock.innerHTML = '';
            const option = document.createElement('option');
            option.innerText = '-- Выберите категорию --';
            categoryBlock.appendChild(option);
        }
    }


}

