import {CustomHttp} from "../../services/custom-http";
import {EditCategoryType} from "../../types/edit-category.type";
import {HttpResultType} from "../../types/http-result.type";

export class ExpenseCategoryCreate {
    public openNewRoute: (url: string) => Promise<void>;
    private categoryValueElement: HTMLElement | null;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        this.categoryValueElement = document.getElementById('new-expense-category-name');

        const createExpenseCategoryEl:HTMLElement | null =  document.getElementById('create-expense-category');
        const incomeBlockEl:HTMLElement | null = document.getElementById('income-block');
        const expenseBlockEl:HTMLElement | null =  document.getElementById('expense-block');

        if (createExpenseCategoryEl) {
            createExpenseCategoryEl.addEventListener('click', this.createNewExpenseCategory.bind(this));
        }
        if (incomeBlockEl) {
            incomeBlockEl.addEventListener('click', this.toIncome.bind(this));
        }
        if (expenseBlockEl) {
            expenseBlockEl.addEventListener('click', this.toExpense.bind(this));
        }



    }

    private async createNewExpenseCategory():Promise<void> {
        const result:HttpResultType = await CustomHttp.request('/categories/expense', 'POST', true, {
            title: (this.categoryValueElement as HTMLInputElement).value,
        });

        if (result) {
            if (result.error || !result.response || (result.response && !(result.response as EditCategoryType).id || !(result.response as EditCategoryType).title)) {
                alert('Ошибка в добавлении категории');
                await this.openNewRoute('/');
                return;
            }
            await this.openNewRoute('/expense');


        }

    }

    async toIncome() {
        await this.openNewRoute('/income');
    }
    async toExpense() {
        await this.openNewRoute('/expense');
    }


}
