import React from "react";

export interface IPagination { perPage: number, page: number }
export interface IPaginationData { pagination: IPagination, setPagination: (value: IPagination) => void }

export const PaginationContext = React.createContext<IPaginationData | null>(null)