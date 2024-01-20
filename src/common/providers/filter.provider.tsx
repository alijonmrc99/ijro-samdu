import { FC, useState } from "react";
import { FilterContext, IInnerFilter } from "../contexts/filter.context";

export const FilterProvider: FC<any> = ({ children }) => {
    const [filter, setFilter] = useState<IInnerFilter>({});

    return <FilterContext.Provider value={{ filter, setFilter }}>
        {children}
    </FilterContext.Provider>
}