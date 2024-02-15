import { ID } from "../../../common/models/baseTypes";

export interface IAppeals {
    id?: ID,
    accepted_date_and_index: string,
    given_date: string,
    creator: string,
    title_or_summary: string,
    resolution: string,
    performer_and_date: string,
    performed_sign: string,
    file_name?: string
    _method?: string
}
export interface IAppealsResponse {
    id?: ID,
    acceptedDateAndIndex: string,
    givenDate: string,
    titleOrSummary: string,
    creator: string,
    resolution: string,
    performerAndDate: string
    performedSign: string
    file_name: string
}




