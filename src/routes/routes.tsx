import { IndexRouteObject, Navigate, NonIndexRouteObject, RouteObject } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS, ROUTE_EDIT, ROUTE_HOME, ROUTE_LOGIN, RoleTypeEnums } from "../common/constants";
import { LoginForm } from "../features/auth/companets/login-form";
import { HomePage } from "../pages/home-page";
import { DashboardBase } from "../layouts/DashboardBase";
import { Documents } from "../pages/documents";
import { Document } from "../pages/documents/document/Document";
import { DocumentEdit } from "../pages/documents/doc-edit/DocumentEdit";


export type RouteObjectType = IndexRouteObject |
    (Omit<NonIndexRouteObject, 'children'> & { children: (RouteObject & { roles?: RoleTypeEnums[] })[] }) & { roles?: RoleTypeEnums[] }

export const routes = (): RouteObjectType[] => {
    return [
        {
            path: ROUTE_HOME,
            caseSensitive: true,
            element: <HomePage />,
            children: [
                {
                    path: ROUTE_LOGIN,
                    element: <LoginForm />
                }
            ]
        },
        {
            path: ROUTE_DASHBOARD,
            caseSensitive: true,
            element: <DashboardBase />,
            children: [
                {
                    path: ROUTE_DASHBOARD,
                    element: <Navigate to={`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}`} replace />
                },
                {
                    path: ROUTE_DOCUMENTS,
                    element: <Documents />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/:id`,
                    element: <Document />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/:id/${ROUTE_EDIT}`,
                    element: <DocumentEdit />
                }
            ]
        }
    ]
}