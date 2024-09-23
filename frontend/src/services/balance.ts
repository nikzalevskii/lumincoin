
export class Balance {
    openNewRoute: (url: string) => Promise<void>;
    constructor(openNewRoute: (url: string) => Promise<void>) {
        this.openNewRoute = openNewRoute;

    }


}

