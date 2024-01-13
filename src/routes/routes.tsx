import { IndexRouteObject, Navigate, NonIndexRouteObject, RouteObject } from "react-router-dom";
import { ROUTE_CREATE, ROUTE_DASHBOARD, ROUTE_DOCUMENTS, ROUTE_EDIT, ROUTE_HOME, ROUTE_INCOMNG_DOCS, ROUTE_LOGIN, RoleTypeEnums } from "../common/constants";
import { LoginForm } from "../features/auth/companets/login-form";
import { HomePage } from "../pages/home-page";
import { DashboardBase } from "../layouts/DashboardBase";
import { Documents } from "../pages/vise-reactor-docs";
import { DocumentEdit } from "../pages/vise-reactor-docs";
import { Document } from "../pages/vise-reactor-docs";
import { RDocuments } from "../pages/register-docs/documents/RDocuments";


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
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR],
                    element: <Documents />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR],
                    element: <DocumentEdit />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/:id`,
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR],
                    element: <Document />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/:id/${ROUTE_EDIT}`,
                    element: <DocumentEdit />
                },

                // Route Register 
                {
                    path: `${ROUTE_INCOMNG_DOCS}`,
                    element: <RDocuments />
                },



            ]
        }
    ]
}