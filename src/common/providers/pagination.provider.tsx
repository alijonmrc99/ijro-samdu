import { FC, useState } from "react";
import { IPagination, PaginationContext } from "../contexts/pagination.context";

export const PaginationProvider: FC<any> = ({ children }) => {
    const [pagination, setPagination] = useState<IPagination>({ page: 1, perPage: 30 });

    return <PaginationContext.Provider value={{ pagination, setPagination }}>
        {children}
    </PaginationContext.Provider>


}