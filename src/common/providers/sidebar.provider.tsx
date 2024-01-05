import { FC, useState } from "react";
import { SidebarContext } from "../contexts/sidebar.context";

export const SidebarProvider: FC<any> = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        {children}
    </SidebarContext.Provider>
}