import React from "react";

export interface ISidebarContext { collapsed: boolean, setCollapsed: (value: boolean) => void }

export const SidebarContext = React.createContext<ISidebarContext | null>(null)