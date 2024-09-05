import {CustomHttp} from "../../services/custom-http";

export class IncomesExpensesCreateItem {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.typeSelect = document.getElementById('item-create-type');
        this.categorySelect = document.getElementById('item-create-category');
        this.amountInput = document.getElementById('item-create-amount');
        this.dateInput = document.getElementById('item-create-date');
        this.commentInput = document.getElementById('item-create-comment');

        // this.typeSelectValue = this.typeSelect.options[this.typeSelect.selectedIndex].value;

        this.viewCategories().then();

        document.getElementById('item-create-new-btn').addEventListener('click', this.createNewItem.bind(this));

    }

    validateForm() {
        let validate = true;
        if (!this.amountInput.value || !this.amountInput.value.match(/^\d+$/)) {
            validate = false;
        }
        return validate;
    }

    async createNewItem() {
        if (this.validateForm()) {

            const result = await CustomHttp.request('/operations', 'POST', true, {
                type: this.typeSelect.options[this.typeSelect.selectedIndex].value,
                amount: this.amountInput.value,
                date: this.dateInput.value,
                comment: this.commentInput.value ? this.commentInput.value : ' ',
                category_id: parseInt(this.categorySelect.value),
            });

            if (result) {
                if (result.error || !result.response) {
                    alert('Ошибка в добавлении дохода/расхода');
                    this.openNewRoute('/');
                    return;
                }
                this.openNewRoute('/incomes-expenses');

            }

        }
    }

    async viewCategories() {
        document.getElementById('item-create-type').addEventListener('change', async () => {
            this.typeSelectValue = this.typeSelect.options[this.typeSelect.selectedIndex].value;
            const categories = await this.findCategory(this.typeSelectValue);
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