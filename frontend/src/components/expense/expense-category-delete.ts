import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";
import {DefaultResponseType} from "../../types/default-response.type";
import {GetCategoriesType} from "../../types/get-categories.type";
import {GetOperationType} from "../../types/get-operation.type";
import {HttpResultType} from "../../types/http-result.type";

export class ExpenseCategoryDelete {
    public openNewRoute: (url: string) => Promise<void>;
    readonly startAllPeriod: string;
    readonly finishAllPeriod: string;
    public id: string | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.startAllPeriod = '0000-01-01';
        this.finishAllPeriod = '9999-12-31';

        this.id = UrlUtils.getUrlParam('id');

        if (!this.id) {
            this.openNewRoute('/').then();
            return;
        }

        const expenseWrapEl: HTMLElement | null = document.getElementById('expense-wrap');
        if (expenseWrapEl) {
            expenseWrapEl.style.display = 'block';
            document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';
        }

        const expenseCategoryDeletePopupEl: HTMLElement | null = document.getElementById('expense-category-delete-popup');
        if (expenseCategoryDeletePopupEl) {
            expenseCategoryDeletePopupEl.addEventListener('click', this.deleteExpenseItemsAndCategory.bind(this));
        }
    }


    private async deleteExpenseItemsAndCategory(): Promise<void> {
        const result: HttpResultType = await CustomHttp.request('/categories/expense');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                return alert('Возникла ошибка при запросе расходов. Обратитесь в поддержку');
            }
            if (result.response) {
                const category: GetCategoriesType | undefined = (result.response as GetCategoriesType[]).find(item => item.id === Number(this.id));
                const items: GetOperationType[] | undefined = await this.getItems(this.startAllPeriod, this.finishAllPeriod, this.openNewRoute);
                if (items) {
                    const incomesItemsToDelete: GetOperationType[] = (items as GetOperationType[]).filter(item => item.category === (category as GetCategoriesType).title);
                    for (const item of incomesItemsToDelete) {
                        const result = await CustomHttp.request('/operations/' + item.id, 'DELETE', true);

                        if (result.redirect || result.error || !result.response || (result.response && ((result.response as DefaultResponseType).error))) {
                            alert('Возникла ошибка при удалении дохода/расхода. Обратитесь в поддержку');
                            await this.openNewRoute('/');
                        }
                    }
                }

                await this.deleteCategory();
            }
        }

    }

    async deleteCategory() {
        const result = await CustomHttp.request('/categories/expense/' + this.id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && ((result.response as DefaultResponseType).error))) {
            alert('Возникла ошибка при удалении расхода. Обратитесь в поддержку');
            await this.openNewRoute('/');
        }
        await this.openNewRoute('/expense');
    }

    async getItems(dateFrom: string, dateTo: string, openNewRoute: (url: string) => Promise<void>): Promise<GetOperationType[] | undefined> {
        const result: HttpResultType = await CustomHttp.request('/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        if (result) {
            if (result.redirect) {
                await openNewRoute(result.redirect);
                return;
            }
            if (result.error || !result.response || (result.response as DefaultResponseType).error) {
                alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
                return;
            }
        }

        return (result.response as GetOperationType[]);
    }

}