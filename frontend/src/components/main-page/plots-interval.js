import moment from "moment";
import {PlotPeriods} from "./plot-periods";

export class PlotsInterval {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('interval-dates-main').style.display = 'flex';

        document.getElementById('interval-main').classList.add('flow-period-active');
        document.getElementById('all-period-main').classList.remove('flow-period-active');
        document.getElementById('month-main').classList.remove('flow-period-active');
        document.getElementById('week-main').classList.remove('flow-period-active');
        document.getElementById('today-main').classList.remove('flow-period-active');
        document.getElementById('year-main').classList.remove('flow-period-active');


        let pickerFrom = new Pikaday({
            field: document.getElementById('dateFrom-main'),
            format: 'DD-MM-YYYY',
            i18n: {
                previousMonth : 'Предыдущий Месяц',
                nextMonth     : 'Следующий Месяц',
                months        : ['Январь','Февраль','Март','April','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
                weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
            },
            onSelect: function() {
            }
        });
        let pickerTo = new Pikaday({
            field: document.getElementById('dateTo-main'),
            format: 'DD-MM-YYYY',
            i18n: {
                previousMonth : 'Предыдущий Месяц',
                nextMonth     : 'Следующий Месяц',
                months        : ['Январь','Февраль','Март','April','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
                weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
            },
            onSelect: function() {
            }
        });

        this.dateFrom = null;
        this.dateTo = null;
        document.getElementById('dateFrom-main').addEventListener('change', () => {
            this.dateFrom = pickerFrom.getMoment().format('YYYY-MM-DD');
            if (this.dateFrom && this.dateTo) {
                PlotPeriods.getOperations(this.dateFrom, this.dateTo, openNewRoute).then();
            }
        })
        document.getElementById('dateTo-main').addEventListener('change', () => {
            this.dateTo = pickerTo.getMoment().format('YYYY-MM-DD');
            if (this.dateFrom && this.dateTo) {
                PlotPeriods.getOperations(this.dateFrom, this.dateTo, openNewRoute).then();
            }
        })


    }
}