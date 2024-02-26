import { ID } from "../../../common/models/baseTypes";

export interface IDocuments {
    id: ID,
    title: string,
    body: string,
    isSent: boolean,
    status: "seen" | "approved" | "rejected" | null,
    name: string,
    performer: string,
    phoneNumber: string,
    comments: { text: string }[],
    user: {
        fullName: string,
        job: string
    }
}

export interface IDocumentsSend {
    id?: ID,
    "_method"?: string,
    title: string,
    performer: string,
    phone_number: string,
    body: string,
}

