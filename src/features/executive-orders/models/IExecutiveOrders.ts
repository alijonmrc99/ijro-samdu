import { ID } from "../../../common/models/baseTypes";

export interface IExecutiveOrders {
    id?: ID,
    date: string,
    number: string,
    summary: string,
    owner: string,
    executor: string,
    file_name?: string
    _method?: string
}
export interface IExecutiveOrdersResponse {
    id?: ID,
    date: string,
    number: string,
    summary: string,
    owner: string,
    executor: string,
    fileName: string
    file_name: string
}




