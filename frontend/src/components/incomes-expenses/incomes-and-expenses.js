export class IncomesAndExpenses {
    constructor(openNewRoute) {

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