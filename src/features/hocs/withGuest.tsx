import { ComponentType, useEffect } from "react";
import { BASE_AUTH_TOKEN, ROUTE_DASHBOARD, ROUTE_LOGIN } from "../../common/constants";
import { useNavigate } from "react-router-dom";

export const withGUest = (ComposedComponents: ComponentType) =>
    (props: any) => {

        const token = localStorage.getItem(BASE_AUTH_TOKEN);
        const navigate = useNavigate();

        useEffect(() => {
            if (token) {
                navigate(ROUTE_DASHBOARD); return;
            }
            navigate(ROUTE_LOGIN)

        }, [token])
        return <ComposedComponents {...props} />
    }