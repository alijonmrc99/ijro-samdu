import { ID } from "../../../common/models/baseTypes";

export interface IBusinessTrip {
    id?: ID,
    full_name: string,
    job: string,
    travel_place: string,
    end_date: string,
    start_date: string,
    _method?: string
}


