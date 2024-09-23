import {CustomHttp} from "../../services/custom-http";
import {NewItemBodyType} from "../../types/new-item-body.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {GetCategoriesType} from "../../types/get-categories.type";
import {HttpResultType} from "../../types/http-result.type";

export class IncomesExpensesCreateNewItem {
    public type: string;
    public openNewRoute: (url: string) => Promise<void>;
    readonly typeSelect: HTMLElement | null;
    private typeSelectValue: string | null;
    readonly categorySelect: HTMLElement | null;
    readonly amountInput: HTMLElement | null;
    readonly dateInput: HTMLElement | null;
    readonly commentInput: HTMLElement | null;


    constructor(openNewRoute: (url: string) => Promise<void>, type: string) {
        this.openNewRoute = openNewRoute;
        this.type = type;
        this.typeSelect = document.getElementById('item-create-type');
        this.categorySelect = document.getElementById('item-create-category');
        this.amountInput = document.getElementById('item-create-amount');
        this.dateInput = document.getElementById('item-create-date');
        this.commentInput = document.getElementById('item-create-comment');
        this.typeSelectValue = null;


        this.viewCategories(this.type).then();

        const createNewBtnEl:HTMLElement | null = document.getElementById('item-create-new-btn');
        if (createNewBtnEl) {
            createNewBtnEl.addEventListener('click', this.createNewItem.bind(this));
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

    async createNewItem():Promise<void> {
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


            const result:HttpResultType = await CustomHttp.request('/operations', 'POST', true, body);

            if (result) {
                if (result.error || !result.response) {
                    alert('Ошибка в добавлении дохода/расхода');
                    await this.openNewRoute('/');
                    return;
                }
                await this.openNewRoute('/incomes-expenses');

            }

        }
    }

    async viewCategories(type: string):Promise<void> {
        if (this.typeSelect) {
            (this.typeSelect as HTMLSelectElement).value = type;
            let categories = await this.findCategory((this.typeSelect as HTMLSelectElement).value);
            await this.addCategory(categories);
            const itemCreateTypeEl = document.getElementById('item-create-type');
            if (itemCreateTypeEl) {
                itemCreateTypeEl.addEventListener('change', async () => {
                    this.typeSelectValue = (this.typeSelect as HTMLSelectElement).options[(this.typeSelect as HTMLSelectElement).selectedIndex].value;
                    categories = await this.findCategory((this.typeSelect as HTMLSelectElement).value);
                    await this.addCategory(categories);
                });
            }

        }


    }


    async findCategory(type:string):Promise<any> {
        if (type) {
            const result = await CustomHttp.request('/categories/' + type);
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

    async addCategory(categories: DefaultResponseType[] | GetCategoriesType[]) {
        const categoryBlock: HTMLElement | null = document.getElementById('item-create-category');
        if (categoryBlock) {
            categoryBlock.innerHTML = '';
            const option:HTMLElement | null = document.createElement('option');
            option.innerText = '-- Выберите категорию --';
            categoryBlock.appendChild(option);
            if (categories) {
                for (let i = 0; i < categories.length; i++) {
                    const option:HTMLOptionElement | null = document.createElement('option');
                    option.innerText = (categories[i] as GetCategoriesType).title;
                    option.value = (categories[i] as GetCategoriesType).id.toString();
                    categoryBlock.appendChild(option);
                }
            }
        }

    }

}