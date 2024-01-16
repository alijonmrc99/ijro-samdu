import React from "react";

export interface IPaginationData { pagination: IPagination, setPagination: (value: IPagination) => void }
export interface IPagination { perPage: number, page: number }

export const PaginationContext = React.createContext<IPaginationData | null>(null)