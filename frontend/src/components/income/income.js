export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('expense-block').addEventListener('click', this.toExpense.bind(this))

        document.getElementById('categories').classList.add('collapsed');
        document.getElementById('orders-collapse').classList.add('show');
        document.getElementById('category-block').classList.add('category-block-active');
        document.getElementById('category-block').classList.add('category-income-active');

        document.getElementById('main-page').classList.remove('active');
        document.getElementById('main-page').classList.add('main-active-off-picture');
        document.getElementById('categories-text').classList.add('categories-text-active');
        // document.getElementById('incomes-expenses-page').classList.remove('active');
        // document.getElementById('incomes-expenses-page').classList.remove('ie-active-off-picture');


        console.log('INCOME');

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