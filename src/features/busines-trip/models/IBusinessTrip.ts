import { ID } from "../../../common/models/baseTypes";

export interface IBusinessTrip {
    id?: ID,
    full_name: string,
    file_name?: string
    job: string,
    travel_place: string,
    end_date: string,
    start_date: string,
    _method?: string
}
export interface IBusinessTripResponse {
    id?: ID,
    fullName: string,
    job: string,
    travelPlace: string,
    endDate: string,
    startDate: string,
    file_name: string
}




