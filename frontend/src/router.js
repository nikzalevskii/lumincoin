import {Dashboard} from "./components/dashboard";
import {Form} from "./components/auth/form";
import {Logout} from "./components/auth/logout";
import {Auth} from "./services/auth";
import {Income} from "./components/income/income";
import {IncomeCategoryCreate} from "./components/income/income-category-create";
import {Expense} from "./components/expense/expense";
import {ExpenseCategoryCreate} from "./components/expense/expense-category-create";
import {IncomesAndExpenses} from "./components/incomes-expenses/incomes-and-expenses";
import {Plots} from "./components/plots";
import {IncomeCategoryEdit} from "./components/income/income-category-edit";
import {ExpenseCategoryEdit} from "./components/expense/expense-category-edit";
import {Layout} from "./components/layout";
import {FileService} from "./services/file-service";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.bootstrapStyleElement = document.getElementById('bootstrap_style');

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard(this.openNewRoute.bind(this));
                    new Plots();
                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false,
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    new Form('login', this.openNewRoute.bind(this));
                },
            },
            {
                route: '/signup',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/signup.html',
                useLayout: false,
                load: () => {
                    new Form('signup', this.openNewRoute.bind(this));
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/income-category/income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new Income(this.openNewRoute.bind(this));
                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/income/category-create',
                title: 'Добавить доход',
                filePathTemplate: '/templates/pages/income-category/income-category-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new IncomeCategoryCreate(this.openNewRoute.bind(this));
                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/income/category-edit',
                title: 'Редактировать доход',
                filePathTemplate: '/templates/pages/income-category/income-category-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new IncomeCategoryEdit(this.openNewRoute.bind(this));

                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/income/category-delete',
                title: 'Удалить доход',
                // filePathTemplate: '/templates/pages/income-category/income-category-delete.html',
                filePathTemplate: '/templates/pages/income-category/income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new Income(this.openNewRoute.bind(this));


                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/expense',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expense-category/expense.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new Expense(this.openNewRoute.bind(this));
                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/expense/category-create',
                title: 'Добавить расход',
                filePathTemplate: '/templates/pages/expense-category/expense-category-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new ExpenseCategoryCreate(this.openNewRoute.bind(this));
                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/expense/category-edit',
                title: 'Редактирование расхода',
                filePathTemplate: '/templates/pages/expense-category/expense-category-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new ExpenseCategoryEdit(this.openNewRoute.bind(this));


                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/expense/category-delete',
                title: 'Удалить категорию расхода',
                filePathTemplate: '/templates/pages/expense-category/expense-category-delete.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();

                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/incomes-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/incomes-expenses/incomes-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();
                    new IncomesAndExpenses(this.openNewRoute.bind(this));

                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/incomes-expenses/createitem',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/incomes-expenses/createitem.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();

                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
            {
                route: '/incomes-expenses/edititem',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/incomes-expenses/edititem.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Layout(this.newRoute);
                    new Dashboard();

                },
                unload: () => {

                },
                styles: [''],
                scripts: [''],

            },
        ];
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {

            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }
        if (element) {
            e.preventDefault();
            const url = element.href.replace(window.location.origin, '');
            if (!url || url === '/#' || url.startsWith('javascript:void(0)')) {
                return;
            }

            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            // this.previousRoute = this.routes.find(item => item.route === oldRoute);
            this.currentRoute = this.routes.find(item => item.route === oldRoute);
            if (this.currentRoute.styles && this.currentRoute.styles.length > 0) {
                this.currentRoute.styles.forEach(style => {
                    document.querySelector(`link[href='/css/${style}']`).remove();
                });
            }
            // if (this.currentRoute.scripts && this.currentRoute.scripts.length > 0) {
            //     this.currentRoute.scripts.forEach(script => {
            //         document.querySelector(`script[src='/js/${script}']`).remove();
            //     });
            // }
            if (this.currentRoute.unload && typeof this.currentRoute.unload === 'function') {
                this.currentRoute.unload();
            }
        }

        const urlRoute = window.location.pathname;
        this.newRoute = this.routes.find(item => item.route === urlRoute);
        // this.previousRoute = this.routes.find(item => item.route === oldRoute);
        // console.log(this.newRoute);

        if (this.newRoute) {
            if (this.newRoute.styles && this.newRoute.styles.length > 0) {
                this.newRoute.styles.forEach(style => {
                    FileService.loadPageStyle('/css/' + style, this.bootstrapStyleElement)
                });
            }
            if (this.newRoute.scripts && this.newRoute.scripts.length > 0) {
                for (const script of this.newRoute.scripts) {
                    // await FileService.loadPageScript('/js/' + script);
                }
            }

            if (this.newRoute.title) {
                this.titlePageElement.innerText = this.newRoute.title + ' | Lumincoin';
            }

            if (this.newRoute.filePathTemplate) {
                let contentBlock = this.contentPageElement;
                if (this.newRoute.useLayout) {
                    if (!this.currentRoute || !this.currentRoute.useLayout) {
                        this.contentPageElement.innerHTML = await fetch(this.newRoute.useLayout).then(response => response.text());
                    }
                    contentBlock = document.getElementById('content-layout');
                }
                contentBlock.innerHTML = await fetch(this.newRoute.filePathTemplate).then(response => response.text());

            }

            const userInfo = Auth.getUserInfo();
            const accessToken = localStorage.getItem(Auth.accessTokenKey);
            if (userInfo && accessToken) {
                this.profileNameElement = document.getElementById('username-layout');
                // console.log(userInfo.name);
                // console.log(userInfo.lastName);
                if (this.profileNameElement) {
                    this.profileNameElement.innerText = userInfo.name + ' ' + userInfo.lastName;
                }

            }

            if (this.newRoute.load && typeof this.newRoute.load === 'function') {
                this.newRoute.load();
            }


        } else {
            console.log('Route not found');
            history.pushState({}, '', '/404');
            await this.activateRoute();
        }

    }

}