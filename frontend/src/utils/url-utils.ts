export class UrlUtils {
    static getUrlParam(param:string):string | null {
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }


}