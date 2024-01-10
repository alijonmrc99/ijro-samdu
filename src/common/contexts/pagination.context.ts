import React from "react";

export interface IPaginationData { pagination: IPagination, setPagination: (value: IPagination) => void }
export interface IPagination { perPage: number, pege: number }

export const PaginationContext = React.createContext<IPaginationData | null>(null)