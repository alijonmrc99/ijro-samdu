import { ID } from "../../../common/models/baseTypes";

export interface ISendDoc {
    id?: ID,
    sent_place: string,
    summary: string,
    number: string,
    _method?: string,
    file_name?: string
}
export interface ISendDocResponse {
    id?: ID,
    sent_place: string,
    number: string,
    summary: string,
    file_name: string
}




