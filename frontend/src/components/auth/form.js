import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";
import config from "../../../config/config";

export class Form {
    constructor(page, openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (Auth.getUserInfo(Auth.accessTokenKey) && Auth.getUserInfo(Auth.accessTokenKey).length > 0) {
            return this.openNewRoute('/');
        }

        this.processElement = null;
        this.emailElement = document.getElementById('email');
        this.nameElement = document.getElementById('name');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('passwordRepeat');
        this.rememberMeElement = document.getElementById('remember');
        this.processElement = document.getElementById('process-button');
        this.commonErrorElement = document.getElementById('common-error');

        this.page = page;
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,}$/,
                valid: false,
            },
        ];

        if (this.page === 'signup') {
            this.fields.unshift({
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{0,}\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,}(\s[А-ЯA-Z][а-яa-zА-ЯA-Z\-]{1,})?$/,
                valid: false,
            });
            this.fields.push({
                name: 'password_repeat',
                id: 'passwordRepeat',
                element: null,
                regex: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,}$/,
                equal: this.passwordElement,
                valid: false,
            });
        }

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });


        this.processElement.addEventListener('click', this.formAccount.bind(this));


    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid');
            element.parentNode.nextElementSibling.style.display = 'block';
            field.valid = false;
        } else if (field.name === 'password_repeat' && element.value !== field.equal.value) {
            element.classList.add('is-invalid');
            element.parentNode.nextElementSibling.style.display = 'block';
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            element.parentNode.nextElementSibling.style.display = 'none';
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        if (validForm) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', "");
        }
        return validForm;
    }

    async formAccount() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
            const email = this.emailElement.value;
            const password = this.passwordElement.value;
            if (this.page === 'signup') {
                try {
                    const result = await CustomHttp.request('/signup', 'POST', false, {
                        name: this.nameElement.value.split(' ')[1],
                        lastName: this.nameElement.value.split(' ')[0],
                        email: email,
                        password: password,
                        passwordRepeat: this.passwordRepeatElement.value
                    });

                    if (result) {
                        if (result.error || !result.response || (result.response && !result.response.user.id || !result.response.user.email || !result.response.user.name || !result.response.user.lastName)) {
                            if (result.response.message === 'User with given email already exist') {
                                this.commonErrorElement.innerText = 'Пользователь с данным email уже существует';
                                this.commonErrorElement.style.display = 'block';
                                return;
                            }
                            this.commonErrorElement.innerText = result.message;
                            this.commonErrorElement.style.display = 'block';
                            return;
                        }
                        this.openNewRoute('/login');
                    }
                } catch (error) {
                    return console.log(error);
                }
            }
            try {
                const result = await CustomHttp.request('/login', 'POST', false, {
                    email: email,
                    password: password,
                    rememberMe: this.rememberMeElement.checked
                });

                if (result) {
                    if (result.error || !result.response || (result.response && !result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user.name || !result.response.user.lastName || !result.response.user.id)) {
                        this.commonErrorElement.innerText = result.response.message;
                        this.commonErrorElement.style.display = 'block';
                        return;
                    }

                    Auth.setTokens(result.response.tokens.accessToken, result.response.tokens.refreshToken);
                    Auth.setUserInfo(result.response.user.id, result.response.user.name, result.response.user.lastName);
                    this.openNewRoute('/');
                } else {
                    this.commonErrorElement.style.display = 'block';
                }
            } catch (error) {
                this.commonErrorElement.style.display = 'block';
                console.log(error);
            }

        }
    }

}