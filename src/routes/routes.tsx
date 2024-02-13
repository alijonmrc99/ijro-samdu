import { IndexRouteObject, Navigate, NonIndexRouteObject, Outlet, RouteObject } from "react-router-dom";
import { ROUTE_APPEAL, ROUTE_BUS_TRIP, ROUTE_CHECK_DOC, ROUTE_CREATE, ROUTE_DASHBOARD, ROUTE_DECREE, ROUTE_DISTRIBUTION, ROUTE_DOCUMENTS, ROUTE_EDIT, ROUTE_EXECUTIVE_ORDER, ROUTE_HOME, ROUTE_INCOMNG_DOCS, ROUTE_LOGIN, ROUTE_MAILED_LETTER, ROUTE_ME, ROUTE_SEND_FROM_UNIVER, ROUTE_USERS, RoleTypeEnums } from "../common/constants";
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
import { MailedLetter, MailedLetters } from "../pages/mailed-letters";
import { ExecutiveOrder, ExecutiveOrders } from "../pages/exucutive-order";
import { Decree, Decrees } from "../pages/decree";
import { SendDocfromUniver, SendDocumentsFromUniver } from "../pages/send-document-from-univer";
import { Appeal, Appeals } from "../pages/appeals";
import { Distribution, Distributions } from "../pages/distribution";


export type RouteObjectType = IndexRouteObject |
    (Omit<NonIndexRouteObject, 'children'> & { children: (RouteObject & { roles?: RoleTypeEnums[] })[] }) & { roles?: RoleTypeEnums[] }

export const routes = (): RouteObjectType[] => {
    // const { data: user } = useAppSelector(state => state.me)
    return [
        // Route chech documents
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
                    roles: [RoleTypeEnums.ROLE_VISE_RECTOR, RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
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
                // Route business trips // Xizmat safarlarni ro'yxatga olish
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
                // Route mailed letters // Universitetdan jo'natilgan xatlar
                {
                    path: `${ROUTE_MAILED_LETTER}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <MailedLetters />
                },
                {
                    path: `${ROUTE_MAILED_LETTER}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <MailedLetter />
                },
                {
                    path: `${ROUTE_MAILED_LETTER}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <MailedLetter />
                },
                // Route executive orders // Ijro buyruqlari qayd etish
                {
                    path: `${ROUTE_EXECUTIVE_ORDER}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <ExecutiveOrders />
                },
                {
                    path: `${ROUTE_EXECUTIVE_ORDER}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <ExecutiveOrder />
                },
                {
                    path: `${ROUTE_EXECUTIVE_ORDER}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <ExecutiveOrder />
                },
                // Route decree // Farmoyishlarni qayd etish
                {
                    path: `${ROUTE_DECREE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Decrees />
                },
                {
                    path: `${ROUTE_DECREE}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Decree />
                },
                {
                    path: `${ROUTE_DECREE}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Decree />
                },
                // Route send documents form university // Universitetdan jo'natilgan hujjatlar
                {
                    path: `${ROUTE_SEND_FROM_UNIVER}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <SendDocumentsFromUniver />
                },
                {
                    path: `${ROUTE_SEND_FROM_UNIVER}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <SendDocfromUniver />
                },
                {
                    path: `${ROUTE_SEND_FROM_UNIVER}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <SendDocfromUniver />
                },
                // Route record appeals // Jismoniy va yuridik shaxlardan tushgan murojaatlarini qayd qilish
                {
                    path: `${ROUTE_APPEAL}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Appeals />
                },
                {
                    path: `${ROUTE_APPEAL}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Appeal />
                },
                {
                    path: `${ROUTE_APPEAL}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Appeal />
                },
                // Route distributions  // Bo'limlarga tegishli hujjatlarni tarqatish
                {
                    path: `${ROUTE_DISTRIBUTION}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Distributions />
                },
                {
                    path: `${ROUTE_DISTRIBUTION}/:id`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Distribution />
                },
                {
                    path: `${ROUTE_DISTRIBUTION}/${ROUTE_CREATE}`,
                    roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY],
                    element: <Distribution />
                },

            ]
        }
    ]
}