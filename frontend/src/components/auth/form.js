import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";
import config from "../../../config/config";

export class Form {
    constructor(page, openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (Auth.getUserInfo(Auth.accessTokenKey)) {
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
                // regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                regex: /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])[0-9a-zA-Zа-яА-Я]{8,}$/,
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
                // regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                regex: /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])[0-9a-zA-Zа-яА-Я]{8,}$/,
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
                    const result = await CustomHttp.request('/signup', 'POST', {
                        name: this.nameElement.value.split(' ')[1],
                        lastName: this.nameElement.value.split(' ')[0],
                        email: email,
                        password: password,
                        passwordRepeat: this.passwordRepeatElement.value
                    });

                    // console.log(result);
                    if (result) {
                        if (result.error || !result.user.id || !result.user.email || !result.user.name || !result.user.lastName) {
                            if (result.message === 'User with given email already exist') {
                                this.commonErrorElement.innerText = 'Пользователь с данным email уже существует';
                                this.commonErrorElement.style.display = 'block';
                                return;
                            }
                            this.commonErrorElement.innerText = result.message;
                            this.commonErrorElement.style.display = 'block';
                            // throw new Error(result.message);
                            return;
                        }
                        this.openNewRoute('/login');
                    }
                } catch (error) {
                    return console.log(error);
                }
            }
            // else if (this.page === 'login') {
                try {
                    const result = await CustomHttp.request('/login', 'POST', {
                        email: email,
                        password: password,
                        rememberMe: this.rememberMeElement.checked
                    });

                    console.log(result);
                    if (result) {
                        if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.name || !result.user.lastName || !result.user.id) {
                            this.commonErrorElement.innerText = result.message;
                            this.commonErrorElement.style.display = 'block';
                            // throw new Error(result.message);
                            return;
                        }

                        Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                        Auth.setUserInfo(result.user.id, result.user.name, result.user.lastName);

                        this.openNewRoute('/');
                    } else {
                        this.commonErrorElement.style.display = 'block';
                        // this.openNewRoute('/login');
                    }
                } catch (error) {
                    console.log(error);
                }

            // }
        }
    }

}