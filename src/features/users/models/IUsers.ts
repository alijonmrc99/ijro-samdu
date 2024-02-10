import { ID } from "../../../common/models/baseTypes";
import { IRole } from "../../auth/models";

export interface IUser {
    id: ID,
    fullName: string,
    username: string,
    password: string,
    _method?: string,
    job: string,
    roles: IRole[]
}

export interface IUserSend {
    id: ID,
    full_name: string,
    username: string,
    password: string,
    _method?: string,
    job: string,
    role?: ID
}
