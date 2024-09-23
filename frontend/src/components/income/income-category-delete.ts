import {UrlUtils} from "../../utils/url-utils";
import {CustomHttp} from "../../services/custom-http";
import {DefaultResponseType} from "../../types/default-response.type";
import {GetCategoriesType} from "../../types/get-categories.type";
import {GetOperationType} from "../../types/get-operation.type";
import {HttpResultType} from "../../types/http-result.type";

export class IncomeCategoryDelete {
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

        const incomeWrapEl:HTMLElement | null = document.getElementById('income-wrap');
        if (incomeWrapEl) {
            incomeWrapEl.style.display = 'block';
            document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';
        }

        const incomeCategoryDeletePopupEl:HTMLElement | null = document.getElementById('income-category-delete-popup');
        if (incomeCategoryDeletePopupEl) {
            incomeCategoryDeletePopupEl.addEventListener('click', this.deleteIncomeItemsAndCategory.bind(this));
        }

    }



    async deleteIncomeItemsAndCategory() {
        const result:HttpResultType = await CustomHttp.request('/categories/income');

        if (result) {
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || (result.response as DefaultResponseType).error || !result.response) {
                return alert('Возникла ошибка при запросе доходов. Обратитесь в поддержку');
            }
            if (result.response) {
                const category: GetCategoriesType | undefined = (result.response as GetCategoriesType[]).find((item:GetCategoriesType) => item.id === Number(this.id));
                const items = await this.getItems(this.startAllPeriod, this.finishAllPeriod, this.openNewRoute);
                const incomesItemsToDelete:GetOperationType[] = (items as GetOperationType[]).filter(item => item.category === (category as GetCategoriesType).title);
                for (const item of incomesItemsToDelete) {
                    const result:HttpResultType = await CustomHttp.request('/operations/' + item.id, 'DELETE', true);

                    if (result.redirect || result.error || !result.response || (result.response && ((result.response as DefaultResponseType).error))) {
                        alert('Возникла ошибка при удалении дохода/расхода. Обратитесь в поддержку');
                        await this.openNewRoute('/');
                    }
                }
                await this.deleteCategory();
            }
        }

    }

    async deleteCategory():Promise<void> {
        const result:HttpResultType = await CustomHttp.request('/categories/income/' + this.id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && ((result.response as DefaultResponseType).error))) {
            alert('Возникла ошибка при удалении дохода. Обратитесь в поддержку');
            await this.openNewRoute('/');
        }
        await this.openNewRoute('/income');
    }

    async getItems(dateFrom:string, dateTo:string, openNewRoute: (url: string) => Promise<void>): Promise<GetOperationType[] | undefined> {
        const result = await CustomHttp.request('/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        if (result) {
            if (result.redirect) {
                await openNewRoute(result.redirect);
                return;
            }
            if (result.error || !result.response || (result.response as DefaultResponseType).error) {
                alert('Возникла ошибка при запросе операций. Обратитесь в поддержку');
                return;
            }
            return (result.response as GetOperationType[]);
        }


    }
}