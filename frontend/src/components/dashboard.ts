import {Auth} from "../services/auth";

export class Dashboard {
    public openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;
        if (!Auth.getAuthInfo(Auth.accessTokenKey) || !Auth.getAuthInfo(Auth.refreshTokenKey)) {
            this.openNewRoute('/signup').then();
        }

        const UserBlockEl:HTMLElement | null = document.getElementById('user-block');
        const LogOutEl:HTMLElement | null = document.getElementById('drop-logout');
        if (UserBlockEl) {
            UserBlockEl.addEventListener('click', function () {
                if (LogOutEl) {
                    LogOutEl.classList.add('dropdown-menu-show');
                }
            })
        }



    }


}