export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this))

        document.getElementById('add-income').addEventListener("click", this.newIncomeCategory.bind(this));

        this.incomesDelete = document.getElementsByClassName('income-category-delete');
        for (let i = 0; i < this.incomesDelete.length; i++) {
            this.incomesDelete[i].addEventListener('click', function () {
                document.getElementById('income-popup').style.display = 'block';
                document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';
                // document.body.style.backgroundColor = 'black';
            })
        }
        this.incomesEdit = document.getElementsByClassName('income-category-edit');
        for (let i = 0; i < this.incomesEdit.length; i++) {
            this.incomesEdit[i].addEventListener('click', this.toCategoryEdit.bind(this));
        }

    }

    async toCategoryEdit() {
        await this.openNewRoute('/income/category-edit');
    }
    async toExpense() {
        await this.openNewRoute('/expense');
    }
    async newIncomeCategory() {
        await this.openNewRoute('/income/category-create');
    }

}