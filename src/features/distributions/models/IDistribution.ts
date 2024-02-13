import { ID } from "../../../common/models/baseTypes";

export interface IDistribution {
    id?: ID,
    applicant: string,
    structure: string,
    recipent: string,
    date: string,
    file_name?: string
    _method?: string
}
export interface IDistributionResponse {
    id?: ID,
    applicant: string,
    structure: string,
    recipent: string,
    date: string,
    fileName: string
}




