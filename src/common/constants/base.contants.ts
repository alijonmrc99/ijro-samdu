import { ID } from "../models"

export const BASE_AUTH_USER = "user"
export const BASE_AUTH_TOKEN = "token"

export enum RoleTypeEnums {
    ROLE_ADMIN = "admin",
    ROLE_REGISTER = "register",
    ROLE_VISE_RECTOR = "vise-rector",
    ROLE_SECRETARY = "secretary"
}

export interface IFile {
    id: ID,
    path: string,
    fileName: string,
    size: number
}