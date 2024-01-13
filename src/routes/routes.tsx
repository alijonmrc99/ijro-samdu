import { IndexRouteObject, Navigate, NonIndexRouteObject, RouteObject } from "react-router-dom";
import { ROUTE_CREATE, ROUTE_DASHBOARD, ROUTE_DOCUMENTS, ROUTE_EDIT, ROUTE_HOME, ROUTE_INCOMNG_DOCS, ROUTE_LOGIN, RoleTypeEnums } from "../common/constants";
import { LoginForm } from "../features/auth/companets/login-form";
import { HomePage } from "../pages/home-page";
import { DashboardBase } from "../layouts/DashboardBase";
import { Documents } from "../pages/vise-reactor-docs";
import { DocumentEdit } from "../pages/vise-reactor-docs";
import { Document } from "../pages/vise-reactor-docs";
import { RegDocuments } from "../pages/register-docs/documents/RegDocuments";
import { RegDocument } from "../pages/register-docs/document/RegDocument";


export type RouteObjectType = IndexRouteObject |
    (Omit<NonIndexRouteObject, 'children'> & { children: (RouteObject & { roles?: RoleTypeEnums[] })[] }) & { roles?: RoleTypeEnums[] }

export const routes = (): RouteObjectType[] => {
    // const { data: user } = useAppSelector(state => state.me)
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
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR, RoleTypeEnums.ROLE_REGISTER],
                    element: <Documents />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR],
                    element: <DocumentEdit />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/:id`,
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR, RoleTypeEnums.ROLE_REGISTER],
                    element: <Document />
                },
                {
                    path: `${ROUTE_DOCUMENTS}/:id/${ROUTE_EDIT}`,
                    element: <DocumentEdit />,
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR],
                },

                // Route Register 
                {
                    path: `${ROUTE_INCOMNG_DOCS}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER],
                    element: <RegDocuments />
                },
                {
                    path: `${ROUTE_INCOMNG_DOCS}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER],
                    element: <RegDocument />
                },



            ]
        }
    ]
}