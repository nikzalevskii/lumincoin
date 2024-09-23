import {CustomHttp} from "../../services/custom-http";
import {EditCategoryType} from "../../types/edit-category.type";
import {HttpResultType} from "../../types/http-result.type";

export class IncomeCategoryCreate {
    public openNewRoute: (url: string) => Promise<void>;
    readonly categoryValueElement: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.categoryValueElement = document.getElementById('new-income-category-name');

        const createIncomeCategoryEl:HTMLElement | null = document.getElementById('create-income-category');
        const incomeBlockEl:HTMLElement | null = document.getElementById('income-block');
        const expenseBlockEl:HTMLElement | null =  document.getElementById('expense-block');

        if (createIncomeCategoryEl) {
            createIncomeCategoryEl.addEventListener('click', this.createNewIncomeCategory.bind(this));
        }

        if (incomeBlockEl) {
            incomeBlockEl.addEventListener('click', this.toIncome.bind(this));
        }

        if (expenseBlockEl) {
            expenseBlockEl.addEventListener('click', this.toExpense.bind(this));
        }

    }


    async createNewIncomeCategory():Promise<void> {
        if (this.categoryValueElement) {
            const result:HttpResultType = await CustomHttp.request('/categories/income', 'POST', true, {
                title: (this.categoryValueElement as HTMLInputElement).value,
            });

            if (result) {
                if (result.error || !result.response || (result.response && !(result.response as EditCategoryType).id || !(result.response as EditCategoryType).title)) {
                    alert('Ошибка в добавлении категории');
                    await this.openNewRoute('/');
                    return;
                }
                await this.openNewRoute('/income');

            }
        }


    }

    async toIncome():Promise<void> {
        await this.openNewRoute('/income');
    }

    async toExpense():Promise<void> {
        await this.openNewRoute('/expense');
    }


}
