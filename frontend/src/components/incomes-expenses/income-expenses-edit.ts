import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";
import {NewItemBodyType} from "../../types/new-item-body.type";
import {HttpResultType} from "../../types/http-result.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {GetCategoriesType} from "../../types/get-categories.type";
import {GetOperationType} from "../../types/get-operation.type";

export class IncomeExpensesEdit {
    public id: string | null;
    public openNewRoute: (url: string) => Promise<void>;
    private typeSelect: HTMLElement | null = null;
    private typeSelectValue: string | null = null;
    private categorySelect: HTMLElement | null = null;
    private amountInput: HTMLElement | null = null;
    private dateInput: HTMLElement | null = null;
    private commentInput: HTMLElement | null = null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.findElements();
        this.id = UrlUtils.getUrlParam('id');
        if (!this.id) {
            this.openNewRoute('/').then();
            return;
        }

        this.getItem().then();

        const itemCreateNewBtnEl:HTMLElement | null = document.getElementById('item-create-new-btn');
        if (itemCreateNewBtnEl) {
            itemCreateNewBtnEl.addEventListener('click', this.editItem.bind(this));
        }

    }

    findElements() {
        this.typeSelect = document.getElementById('item-create-type');
        this.categorySelect = document.getElementById('item-create-category');
        this.amountInput = document.getElementById('item-create-amount');
        this.dateInput = document.getElementById('item-create-date');
        this.commentInput = document.getElementById('item-create-comment');
        this.id = UrlUtils.getUrlParam('id');
    }

    async editItem():Promise<void> {
        if (this.validateForm()) {

            let body: NewItemBodyType = {
                type: '',
                amount: null,
                date: '',
                comment: '',
                category_id: null,
            };

            if (this.typeSelect) {
                body.type = (this.typeSelect as HTMLSelectElement).options[(this.typeSelect as HTMLSelectElement).selectedIndex].value;
            }
            if (this.amountInput) {
                if (!(this.amountInput as HTMLInputElement).value) {
                    alert('Необходимо ввести сумму. Попробуйте снова');
                    return;
                }
                body.amount = parseInt((this.amountInput as HTMLInputElement).value);
            }
            if (this.dateInput) {
                if (!(this.dateInput as HTMLInputElement).value) {
                    alert('Необходимо выбрать дату. Попробуйте снова');
                    return;
                }
                body.date = (this.dateInput as HTMLInputElement).value;
            }
            if (this.commentInput) {
                body.comment = (this.commentInput as HTMLInputElement).value ? (this.commentInput as HTMLInputElement).value : ' ';
            }

            if (this.categorySelect) {
                if (!(this.categorySelect as HTMLSelectElement).value || (this.categorySelect as HTMLSelectElement).value === '-- Выберите категорию --') {
                    alert('Необходимо выбрать категорию. Попробуйте снова');
                    return;
                }
                body.category_id = parseInt((this.categorySelect as HTMLSelectElement).value);
            }

            const result:HttpResultType = await CustomHttp.request('/operations/' + this.id, 'PUT', true, body)


            if (result) {
                if (result.error || !result.response) {
                    alert('Ошибка в редактировании дохода/расхода');
                    await this.openNewRoute('/');
                    return;
                }
                await this.openNewRoute('/incomes-expenses');

            }
        }

    }

    validateForm():boolean {
        let validate:boolean = true;
        if (this.amountInput) {
            if (!(this.amountInput as HTMLInputElement).value || !(this.amountInput as HTMLInputElement).value.match(/^\d+$/)) {
                validate = false;
            }
        }

        return validate;
    }

    async getItem():Promise<void> {
        const result: HttpResultType = await CustomHttp.request('/operations/' + this.id);
        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.response) {
                if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                    return alert('Возникла ошибка при запросе дохода/расхода. Обратитесь в поддержку');
                }
                const item: GetOperationType = (result.response as GetOperationType);

                await this.showItem(item);
            }

        }

    }


    async showItem(item: GetOperationType):Promise<void> {
        let categories = await this.findCategory(item.type);
        await this.addCategory(categories);
        if (this.typeSelect) {
            (this.typeSelect as HTMLSelectElement).value = item.type;
        }
        const selectedCategory = categories.find((category:GetCategoriesType) => category.title === item.category);
        if (this.categorySelect) {
            (this.categorySelect as HTMLSelectElement).value = selectedCategory.id;
        }

        if (this.amountInput && item.amount) {
            (this.amountInput as HTMLInputElement).value = item.amount.toString();
        }
        if (this.dateInput && item.date) {
            (this.dateInput as HTMLInputElement).value = item.date.toString();
        }

        if (this.commentInput && item.comment) {
            (this.commentInput as HTMLInputElement).value = item.comment.toString();
        }

        const itemCreateTypeEl:HTMLElement | null = document.getElementById('item-create-type');
        if (itemCreateTypeEl) {
            itemCreateTypeEl.addEventListener('change', async () => {
                this.typeSelectValue = (this.typeSelect as HTMLSelectElement).options[(this.typeSelect as HTMLSelectElement).selectedIndex].value;
                categories = await this.findCategory((this.typeSelect as HTMLSelectElement).value);
                await this.addCategory(categories);
            });
        }



    }


    async findCategory(type: string): Promise<any> {
        if (type) {
            const result: HttpResultType = await CustomHttp.request('/categories/' + type);
            if (result) {
                if (result.redirect) {
                    return this.openNewRoute(result.redirect);
                }
                if (result.response) {
                    if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                        return alert('Возникла ошибка при запросе категорий. Обратитесь в поддержку');
                    }
                }

            }
            return result.response;
        }
    }

    //
    async addCategory(categories:GetCategoriesType[]):Promise<void> {
        const categoryBlock: HTMLElement | null = document.getElementById('item-create-category');
        if (categoryBlock) {
            categoryBlock.innerHTML = '';
            const option:HTMLElement | null = document.createElement('option');
            option.innerText = '-- Выберите категорию --';
            categoryBlock.appendChild(option);
            if (categories) {
                for (let i = 0; i < categories.length; i++) {
                    const option:HTMLOptionElement = document.createElement('option');
                    option.innerText = categories[i].title;
                    option.value = categories[i].id.toString();
                    categoryBlock.appendChild(option);
                }
            }
        }

    }


}

