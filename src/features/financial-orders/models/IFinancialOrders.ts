import { ID } from "../../../common/models/baseTypes";

export interface IFinancialOrders {
    id?: ID,
    number: string,
    date: string,
    summary: string,
    comment: string,
    file_name?: string
    _method?: string
}
export interface IFinancialOrdersResponse {
    id?: ID,
    number: string,
    date: string,
    summary: string,
    comment: string,
    file_name: string
}




