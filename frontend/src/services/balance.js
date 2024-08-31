import {CustomHttp} from "./custom-http";

export class Balance {
    constructor(openNewRoute) {

    }
    static async getBalance(openNewRoute) {
        const balanceItem = document.getElementById('balance-value');



        const result = await CustomHttp.request('/balance');
        if (result) {
            if (result.redirect) {
                return openNewRoute(result.redirect);
            }
            if (result.error || !result.response || result.response.error) {
                return alert('Возникла ошибка при запросе баланса. Обратитесь в поддержку');
            }

            balanceItem.innerText = result.response.balance + '$';

        }
    }

}

