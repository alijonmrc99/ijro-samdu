import { IndexRouteObject, Navigate, NonIndexRouteObject, Outlet, RouteObject } from "react-router-dom";
import { ROUTE_BUS_TRIP, ROUTE_CHECK_DOC, ROUTE_CREATE, ROUTE_DASHBOARD, ROUTE_DOCUMENTS, ROUTE_EDIT, ROUTE_HOME, ROUTE_INCOMNG_DOCS, ROUTE_LOGIN, ROUTE_ME, ROUTE_USERS, RoleTypeEnums } from "../common/constants";
import { LoginForm } from "../features/auth/companets/login-form";
import { HomePage } from "../pages/home-page";
import { DashboardBase } from "../layouts/DashboardBase";
import { Documents } from "../pages/vise-reactor-docs";
import { DocumentEdit } from "../pages/vise-reactor-docs";
import { Document } from "../pages/vise-reactor-docs";
import { RegDocuments } from "../pages/register-docs/documents/RegDocuments";
import { RegDocument } from "../pages/register-docs/document/RegDocument";
import { Profile, User, Users } from "../pages/users";
import { BusinessTrip, BusinessTrips } from "../pages/business-trip";
import { CheckDocuments } from "../pages/check-document";


export type RouteObjectType = IndexRouteObject |
    (Omit<NonIndexRouteObject, 'children'> & { children: (RouteObject & { roles?: RoleTypeEnums[] })[] }) & { roles?: RoleTypeEnums[] }

export const routes = (): RouteObjectType[] => {
    // const { data: user } = useAppSelector(state => state.me)
    return [
        {
            path: ROUTE_CHECK_DOC,
            element: <Outlet></Outlet>,
            caseSensitive: true,
            children: [
                {
                    path: ":id",
                    element: <CheckDocuments />,
                    caseSensitive: true,
                }
            ]
        },
        {
            path: ROUTE_HOME,
            caseSensitive: true,
            element: <HomePage />,
            children: [
                {
                    path: ROUTE_LOGIN,
                    element: <LoginForm />
                },
                // Route chech documents
                {

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

                // Route users
                {
                    path: `${ROUTE_USERS}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER],
                    element: <Users />
                },
                {
                    path: `${ROUTE_USERS}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER],
                    element: <User />
                },
                {
                    path: `${ROUTE_USERS}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER],
                    element: <User />
                },
                // route account setting
                {
                    path: `${ROUTE_ME}/`,
                    element: <Profile />
                },
                // Route business trips
                {
                    path: `${ROUTE_BUS_TRIP}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <BusinessTrips />
                },
                {
                    path: `${ROUTE_BUS_TRIP}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <BusinessTrip />
                },
                {
                    path: `${ROUTE_BUS_TRIP}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <BusinessTrip />
                },

            ]
        }
    ]
}