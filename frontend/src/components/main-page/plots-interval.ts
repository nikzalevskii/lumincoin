import moment from "moment";
import {PlotPeriods} from "./plot-periods";
import Pikaday from 'pikaday';

export class PlotsInterval {
    public openNewRoute: (url: string) => Promise<void>;
    private dateFrom: string | null;
    private dateTo: string | null;

    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;


        const intervalDatesMain:HTMLElement | null = document.getElementById('interval-dates-main');
        if (intervalDatesMain) {
            intervalDatesMain.style.display = 'flex';
        }

        const todayMainEl:HTMLElement | null = document.getElementById('today-main');
        const weekMainEl:HTMLElement | null = document.getElementById('week-main');
        const monthMainEl:HTMLElement | null = document.getElementById('month-main');
        const yearMainEl:HTMLElement | null = document.getElementById('year-main');
        const allPeriodMainEl:HTMLElement | null = document.getElementById('all-period-main');
        const intervalMainEl:HTMLElement | null = document.getElementById('interval-main');

        if (todayMainEl && weekMainEl && monthMainEl && yearMainEl && allPeriodMainEl && intervalMainEl) {
            intervalMainEl.classList.add('flow-period-active');
            allPeriodMainEl.classList.remove('flow-period-active');
            monthMainEl.classList.remove('flow-period-active');
            weekMainEl.classList.remove('flow-period-active');
            todayMainEl.classList.remove('flow-period-active');
            yearMainEl.classList.remove('flow-period-active');
        }


        let pickerFrom = new Pikaday({
            field: document.getElementById('dateFrom-main'),
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
            field: document.getElementById('dateTo-main'),
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
        const dateFromMain:HTMLElement | null = document.getElementById('dateFrom-main');
        if (dateFromMain) {
            dateFromMain.addEventListener('change', () => {
                this.dateFrom = (pickerFrom.getMoment() as moment.Moment).format('YYYY-MM-DD');
                if (this.dateFrom && this.dateTo) {
                    PlotPeriods.getOperations(this.dateFrom, this.dateTo, openNewRoute).then();
                }
            })
        }

        const dateToMain:HTMLElement | null = document.getElementById('dateTo-main');
        if (dateToMain) {
            dateToMain.addEventListener('change', () => {
                this.dateTo = (pickerTo.getMoment() as moment.Moment).format('YYYY-MM-DD');
                if (this.dateFrom && this.dateTo) {
                    PlotPeriods.getOperations(this.dateFrom, this.dateTo, openNewRoute).then();
                }
            })
        }


    }
}