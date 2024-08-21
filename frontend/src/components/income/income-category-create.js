export class IncomeCategoryCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('income-block').addEventListener('click', this.toIncome.bind(this));
        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this));


        console.log('INCOME-CREATE-CATEGORY');
    }

    async toIncome() {
        await this.openNewRoute('/income');
    }
    async toExpense() {
        await this.openNewRoute('/expense');
    }


}
