import { IndexRouteObject, NonIndexRouteObject, RouteObject } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_HOME, ROUTE_LOGIN, RoleTypeEnums } from "../common/constants";
import { LoginForm } from "../features/auth/companets/login-form";
import { HomePage } from "../pages/home-page";
import { DashboardBase } from "../layouts/DashboardBase";


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

            ]
        }
    ]
}