import {CustomHttp} from "../../services/custom-http";
import {Auth} from "../../services/auth";
import {FormFieldType} from "../../types/form-field.type";
import {SignUpType} from "../../types/sign-up.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {LoginType} from "../../types/login.type";
import {HttpResultType} from "../../types/http-result.type";

export class Form {
    public openNewRoute: (url: string) => Promise<void>;
    private fields: FormFieldType[];
    readonly processElement: HTMLElement | null;
    private emailElement: HTMLElement | null;
    private nameElement: HTMLElement | null;
    readonly passwordElement: HTMLElement | null;
    private passwordRepeatElement: HTMLElement | null;
    private rememberMeElement: HTMLElement | null;
    readonly commonErrorElement: HTMLElement | null;
    readonly page: string;

    constructor(page: string, openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        this.page = page;
        this.processElement = null;
        this.emailElement = document.getElementById('email');
        this.nameElement = document.getElementById('name');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('passwordRepeat');
        this.rememberMeElement = document.getElementById('remember');
        this.processElement = document.getElementById('process-button');
        this.commonErrorElement = document.getElementById('common-error');
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
        if (Auth.getAuthInfo(Auth.accessTokenKey) && Auth.getAuthInfo(Auth.accessTokenKey).length > 0) {
            this.openNewRoute('/').then();
            return;
        }

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
            if (item.element) {
                item.element.onchange = function () {
                    that.validateField.call(that, item, (this as HTMLInputElement));
                }
            }

        });

        if (this.processElement) {
            this.processElement.addEventListener('click', this.formAccount.bind(this));
        }


    }

    private validateField(field: FormFieldType, element: HTMLInputElement | null):void {
        if (element) {
            if (!element.value || !element.value.match(field.regex)) {
                element.classList.add('is-invalid');
                const parentEl: HTMLElement | ParentNode | null = element.parentNode;
                if (parentEl) {
                    const parentSiblingEl = (parentEl as HTMLElement).nextElementSibling;
                    if (parentSiblingEl) {
                        (parentSiblingEl as HTMLElement).style.display = 'block';
                    }
                }
                field.valid = false;
            } else if (field.name === 'password_repeat' && element.value !== (field.equal as HTMLInputElement).value) {
                element.classList.add('is-invalid');
                const parentEl: HTMLElement | ParentNode | null = element.parentNode;
                if (parentEl) {
                    const parentSiblingEl = (parentEl as HTMLElement).nextElementSibling;
                    if (parentSiblingEl) {
                        (parentSiblingEl as HTMLElement).style.display = 'block';
                    }
                }
                field.valid = false;
            } else {
                element.classList.remove('is-invalid');
                const parentEl: HTMLElement | ParentNode | null = element.parentNode;
                if (parentEl) {
                    const parentSiblingEl = (parentEl as HTMLElement).nextElementSibling;
                    if (parentSiblingEl) {
                        (parentSiblingEl as HTMLElement).style.display = 'none';
                    }
                }
                field.valid = true;
            }
            this.validateForm();
        }

    }

    private validateForm():boolean {
        const validForm:boolean = this.fields.every(item => item.valid);
        if (this.processElement) {
            if (validForm) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', "");
            }
        }

        return validForm;
    }

    private async formAccount():Promise<void> {
        if (this.commonErrorElement) {
            this.commonErrorElement.style.display = 'none';
        }
        if (this.validateForm()) {
            const email:string = (this.emailElement as HTMLInputElement).value;
            const password:string = (this.passwordElement as HTMLInputElement).value;
            if (this.page === 'signup') {
                try {
                    const result:HttpResultType = await CustomHttp.request('/signup', 'POST', false, {
                        name: (this.nameElement as HTMLInputElement).value.split(' ')[1],
                        lastName: (this.nameElement as HTMLInputElement).value.split(' ')[0],
                        email: email,
                        password: password,
                        passwordRepeat: (this.passwordRepeatElement as HTMLInputElement).value
                    });

                    if (result) {
                        if (result.error || !result.response || (result.response && !(result.response as SignUpType).user.id || !(result.response as SignUpType).user.email || !(result.response as SignUpType).user.name || !(result.response as SignUpType).user.lastName)) {
                            if ((result.response as DefaultResponseType).message === 'User with given email already exist') {
                                if (this.commonErrorElement) {
                                    this.commonErrorElement.innerText = 'Пользователь с данным email уже существует';
                                    this.commonErrorElement.style.display = 'block';
                                }
                                return;
                            }
                            if (this.commonErrorElement) {
                                this.commonErrorElement.innerText = (result.response as DefaultResponseType).message;
                                this.commonErrorElement.style.display = 'block';
                            }
                            return;
                        }
                        await this.openNewRoute('/login');
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
            try {
                const result:HttpResultType = await CustomHttp.request('/login', 'POST', false, {
                    email: email,
                    password: password,
                    rememberMe: (this.rememberMeElement as HTMLInputElement).checked
                });

                if (result) {
                    if (result.error || !result.response || (result.response && !(result.response as LoginType).tokens.accessToken || !(result.response as LoginType).tokens.refreshToken || !(result.response as LoginType).user.name || !(result.response as LoginType).user.lastName || !(result.response as LoginType).user.id)) {
                        if (this.commonErrorElement) {
                            this.commonErrorElement.innerText = (result.response as DefaultResponseType).message;
                            this.commonErrorElement.style.display = 'block';
                        }

                        return;
                    }

                    Auth.setTokens((result.response as LoginType).tokens.accessToken, (result.response as LoginType).tokens.refreshToken);
                    Auth.setUserInfo((result.response as LoginType).user.id, (result.response as LoginType).user.name, (result.response as LoginType).user.lastName);
                    await this.openNewRoute('/');
                } else {
                    if (this.commonErrorElement) {
                        this.commonErrorElement.style.display = 'block';
                    }
                }
            } catch (error) {
                if ( this.commonErrorElement) {
                    this.commonErrorElement.style.display = 'block';
                }
                console.log(error);
            }

        }
    }

}