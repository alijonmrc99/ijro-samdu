import React from "react"

export interface IInnerFilter {
    isSent?: {
        eq?: boolean,
        neq?: boolean
    },
    status?: {
        eq?: string,
        neq?: string
    }
    title?: {
        eq?: string,
        lke?: string
    }
    createdAt?: {
        lke?: string,
        neq?: string,
        gt?: string, //2024-12-12 grater then
        gte?: string, // grater then with current date
        bt?: string, // 2024-12-12|2024-12-25,
    },
    name?: {
        eq?: string,
        lke?: string
    }
}
export interface IFilter {
    filter: IInnerFilter, setFilter: (value: IInnerFilter) => void
}

export const FilterContext = React.createContext<IFilter | null>(null)