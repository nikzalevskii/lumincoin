import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";

export class IncomeExpensesEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.findElements();

        if (!this.id) {
            return this.openNewRoute('/');
        }
        console.log(this.id);

        this.getItem().then();

    }

    findElements() {
        this.typeSelect = document.getElementById('item-create-type');
        this.categorySelect = document.getElementById('item-create-category');
        this.amountInput = document.getElementById('item-create-amount');
        this.dateInput = document.getElementById('item-create-date');
        this.commentInput = document.getElementById('item-create-comment');
        this.id = UrlUtils.getUrlParam('id');
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
        console.log(result.response);
        // return result.response;
        const item = result.response;

        this.showItem(item);
    }


    showItem(item) {
        this.typeSelect.options[this.typeSelect.selectedIndex].value = item.amount;
        // this.categorySelect = document.getElementById('item-create-category');
        this.amountInput.value = item.amount;
        this.dateInput.value = item.date;
        this.commentInput.value = item.comment;
    }

    async viewCategories() {

        // document.getElementById('item-create-type').addEventListener('change', async () => {
        //     this.typeSelectValue = this.typeSelect.options[this.typeSelect.selectedIndex].value;
        //     console.log(this.typeSelectValue);
        //     const categories = await this.findCategory(this.typeSelectValue);
        //     await this.addCategory(categories);
        // });


    }

    //
    //
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
    // async addCategory(categories) {
    //     const categoryBlock = document.getElementById('item-create-category');
    //     if (categories) {
    //         for (let i = 0; i < categories.length; i++) {
    //             const option = document.createElement('option');
    //             option.innerText = categories[i].title;
    //             option.value = categories[i].id;
    //             categoryBlock.appendChild(option);
    //         }
    //     } else {
    //         categoryBlock.innerHTML = '';
    //         const option = document.createElement('option');
    //         option.innerText = '-- Выберите категорию --';
    //         categoryBlock.appendChild(option);
    //     }
    // }


}

