import { ID } from "../../../common/models/baseTypes";

export interface IMailledLetters {
    id?: ID,
    comment?: string,
    sent_place_person: string,
    sent_at: string,
    cost: number
    _method?: string
}
export interface IMailledLettersResponse {
    id?: ID,
    comment: string,
    sentPlacePerson: string,
    sentAt: string,
    cost: number
}




