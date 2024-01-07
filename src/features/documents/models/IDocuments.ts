import { ID } from "../../../common/models/baseTypes";

export interface IDocuments {
    id: ID,
    title: string,
    body: string,
    isSend: boolean,
    status: "seen" | "approved" | "rejected" | null,
    name: string
}
