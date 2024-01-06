import { ID } from "../../../common/models/baseTypes";

export interface IDocuments {
    id: ID,
    title: string,
    body: JSON,
    isSend: boolean,
    status: string,
    name: string
}
