import {IncomeAndExpensesPeriods} from "./income-and-expenses-periods";
import Pikaday from 'pikaday';
import moment, {Moment} from "moment";


export class IncomeAndExpensesInterval {
    public openNewRoute: (url: string) => Promise<void>;
    private dateFrom: string | null;
    private dateTo: string | null;


    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

        const intervalDatesEl:HTMLElement | null = document.getElementById('interval-dates');
        if (intervalDatesEl) {
            intervalDatesEl.style.display = 'flex';
        }

        const intervalPeriodEl:HTMLElement | null = document.getElementById('interval');
        const todayPeriodEl:HTMLElement | null = document.getElementById('today');
        const weekPeriodEl:HTMLElement | null = document.getElementById('week');
        const monthPeriodEl:HTMLElement | null = document.getElementById('month');
        const yearPeriodEl:HTMLElement | null = document.getElementById('year');
        const allPeriodEl:HTMLElement | null = document.getElementById('all-period');

        if (allPeriodEl && monthPeriodEl && weekPeriodEl && todayPeriodEl && yearPeriodEl && intervalPeriodEl) {
            intervalPeriodEl.classList.add('flow-period-active');
            todayPeriodEl.classList.remove('flow-period-active');
            weekPeriodEl.classList.remove('flow-period-active');
            monthPeriodEl.classList.remove('flow-period-active');
            yearPeriodEl.classList.remove('flow-period-active');
            allPeriodEl.classList.remove('flow-period-active');
        }


        let pickerFrom = new Pikaday({
            field: document.getElementById('dateFrom'),
            format: 'DD-MM-YYYY',
            i18n: {
                previousMonth: 'Предыдущий Месяц',
                nextMonth: 'Следующий Месяц',
                months: ['Январь', 'Февраль', 'Март', 'April', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            },
            onSelect: function () {
            }
        });
        let pickerTo = new Pikaday({
            field: document.getElementById('dateTo'),
            format: 'DD-MM-YYYY',
            i18n: {
                previousMonth: 'Предыдущий Месяц',
                nextMonth: 'Следующий Месяц',
                months: ['Январь', 'Февраль', 'Март', 'April', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
            },
            onSelect: function () {
            }
        });

        this.dateFrom = null;
        this.dateTo = null;
        const dateFromEl:HTMLElement | null = document.getElementById('dateFrom');
        if (dateFromEl) {
            dateFromEl.addEventListener('change', () => {
                this.dateFrom = (pickerFrom.getMoment() as moment.Moment).format('YYYY-MM-DD');
                if (this.dateFrom && this.dateTo) {
                    IncomeAndExpensesPeriods.getOperations(this.dateFrom, this.dateTo, this.openNewRoute).then();
                }
            })
        }

        const dateToEl:HTMLElement | null = document.getElementById('dateTo');
        if (dateToEl) {
            dateToEl.addEventListener('change', () => {
                this.dateTo = (pickerTo.getMoment() as moment.Moment).format('YYYY-MM-DD');
                if (this.dateFrom && this.dateTo) {
                    IncomeAndExpensesPeriods.getOperations(this.dateFrom, this.dateTo, this.openNewRoute).then();
                }
            })
        }


    }


}