import { ID } from "../../../common/models/baseTypes";

export interface IDocuments {
    id: ID,
    title: string,
    body: string,
    isSent: boolean,
    status: "seen" | "approved" | "rejected" | null,
    name: string
}

export interface IDocumentsSend {
    id?: ID,
    "_method"?: string,
    title: string,
    body: string,
}

