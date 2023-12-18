import { RoleTypeEnums } from "../../../common/constants";
import { ID } from "../../../common/models/baseTypes";

export interface IMe {
    id: ID;
    fullName: string;
    userName: string;
    roles: IRole
}

export interface IRole { id: number, name: RoleTypeEnums, title: string }