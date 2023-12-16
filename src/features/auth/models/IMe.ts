import { RoleTypeEnums } from "../../../common/constants";

export interface IMe {
    fullName: string,
    userName: string,
    roles: IRole
}

export interface IRole { id: number, name: RoleTypeEnums, title: string }