import { ID } from "../../../common/models/baseTypes";

export interface IDecree {
    id?: ID,
    date: string,
    number: string,
    summary: string,
    owner: string,
    file_name: string
    _method?: string
}
export interface IDecreeResponse {
    id?: ID,
    date: string,
    number: string,
    summary: string,
    owner: string,
    fileName: string
}




