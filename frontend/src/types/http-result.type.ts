import {GetCategoriesType} from "./get-categories.type";
import {DefaultResponseType} from "./default-response.type";
import {NewItemBodyType} from "./new-item-body.type";
import {GetOperationType} from "./get-operation.type";
import {EditCategoryType} from "./edit-category.type";
import {SignUpType} from "./sign-up.type";
import {LoginType} from "./login.type";

export type HttpResultType = {
    error: boolean,
    response:LoginType | SignUpType | EditCategoryType | GetOperationType | GetOperationType[] | NewItemBodyType | GetCategoriesType[] | BalanceType | DefaultResponseType | null,
    redirect?:string | null
}


export type BalanceType = {
    error: boolean,
    balance: number | null,
}