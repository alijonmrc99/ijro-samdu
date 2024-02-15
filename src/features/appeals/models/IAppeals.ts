import { ID } from "../../../common/models/baseTypes";

export interface IAppeals {
    id?: ID,
    index_and_created_at: string,
    hand_over_date: string,
    creator: string,
    title_or_summary: string,
    resolution: string,
    performer_and_given_date: string,
    executed_sign: string,
    file_name?: string
    _method?: string
}
export interface IAppealsResponse {
    id?: ID,
    indexAndCreatedAt: string,
    handOverDate: string,
    titleOrSummary: string,
    creator: string,
    resolution: string,
    performerAndGivenDate: string
    executedSign: string
    file_name: string
}




