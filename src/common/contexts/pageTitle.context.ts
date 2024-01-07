import React from "react";

export interface IPageTitleContext { pageTitle: string, setPageTitle: (value: string) => void }

export const PageTitleContext = React.createContext<IPageTitleContext | null>(null) 