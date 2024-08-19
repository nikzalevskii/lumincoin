export class IncomesAndExpenses {
    constructor(openNewRoute) {

        document.getElementById('main-page').classList.remove('active');
        document.getElementById('main-page').classList.add('main-active-off-picture');
        document.getElementById('incomes-expenses-page').classList.add('ie-active-off-picture');
        document.getElementById('incomes-expenses-page').style.color = 'white';
        document.getElementById('incomes-expenses-page').classList.add('active');
        document.getElementById('category-block').classList.remove('category-block-active');
        document.getElementById('categories').classList.add('collapsed');
        // document.getElementById('orders-collapse').classList.remove('show');
        document.getElementById('categories-text').classList.remove('categories-text-active');
        document.getElementById('categories').classList.remove('collapsed');
        // document.getElementById('categories').classList.add('collapsed');


        this.openNewRoute = openNewRoute;
        document.body.style.backgroundColor = '#FFF';
        this.itemsToDelete = document.getElementsByClassName('flow-table-icons-delete');
        for (let i = 0; i < this.itemsToDelete.length; i++) {
            this.itemsToDelete[i].addEventListener('click', function () {
                document.getElementById('item-popup').style.display = 'block';
                document.body.style.boxShadow = '2px 2px 6px 1px #d2d2d2';
                document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            })
        }
    }


}