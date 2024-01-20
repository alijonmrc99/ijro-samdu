import { RoleTypeEnums } from "../../../common/constants";
import { ID } from "../../../common/models/baseTypes";

export interface IMe {
    id: ID;
    fullName: string;
    userName: string;
    roles: IRole[],
    job: string
}

export interface IRole { id: number, name: RoleTypeEnums }