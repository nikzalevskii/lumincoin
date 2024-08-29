import {CustomHttp} from "../../services/custom-http";

export class IncomesExpensesCreateNewItem {
    constructor(openNewRoute, type) {
        this.openNewRoute = openNewRoute;
        this.type = type;
        console.log('create income');
        this.typeSelect = document.getElementById('item-create-type');
        this.categorySelect = document.getElementById('item-create-category');
        this.amountInput = document.getElementById('item-create-amount');
        this.dateInput = document.getElementById('item-create-date');
        this.commentInput = document.getElementById('item-create-comment');

        // this.typeSelectValue = this.typeSelect.options[this.typeSelect.selectedIndex].value;



        this.viewCategories(this.type).then();

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
        // console.log(this.dateInput.value);
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
                return;
            }
            body.category_id = parseInt(this.categorySelect.value);


            // const result = await CustomHttp.request('/operations', 'POST', true, {
            //     type: this.typeSelect.options[this.typeSelect.selectedIndex].value,
            //     amount: this.amountInput.value,
            //     date: this.dateInput.value,
            //     comment: this.commentInput.value ? this.commentInput.value : ' ',
            //     category_id: parseInt(this.categorySelect.value),
            // });
            const result = await CustomHttp.request('/operations', 'POST', true, body);

            if (result) {
                // console.log(result);
                // if (result.error || !result.response || (result.response && !result.response.id || !result.response.type || !result.response.amount || !result.response.date || !result.response.comment || !result.response.category)) {
                if (result.error || !result.response) {
                    alert('Ошибка в добавлении дохода/расхода');
                    this.openNewRoute('/');
                    return;
                }
                this.openNewRoute('/incomes-expenses');

            }

        }
    }

    async viewCategories(type) {
        this.typeSelect.value = type;
        let categories = await this.findCategory(this.typeSelect.value);
        await this.addCategory(categories);
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

    async addCategory(categories) {
        const categoryBlock = document.getElementById('item-create-category');
        categoryBlock.innerHTML = '';
        const option = document.createElement('option');
        option.innerText = '-- Выберите категорию --';
        categoryBlock.appendChild(option);
        // categoryBlock.innerHTML = ' ';
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