import { FC, useState } from "react";
import { PageTitleContext } from "../contexts/pageTitle.context";

export const PageTitleProvider: FC<any> = ({ children }) => {
    const [pageTitle, setPageTitle] = useState<string>("");

    return <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
        {children}
    </PageTitleContext.Provider>
}