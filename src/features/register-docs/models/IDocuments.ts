import { ID } from "../../../common/models/baseTypes";

export interface IDocuments {
    id: ID,
    title: string,
    body: string,
    isSent: boolean,
    status: "seen" | "approved" | "rejected" | null,
    name: string,
    user: {
        fullName: string,
        job: string
    }
}

export interface IDocumentsSave {
    id?: ID,
    _method?: string,
    name: string,
    comment: string,
    status: "seen" | "approved" | "rejected" | null,
}

