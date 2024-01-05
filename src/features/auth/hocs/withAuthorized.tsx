import { ComponentType } from "react";
import { BASE_AUTH_TOKEN } from "../../../common/constants";
import { useMe } from "../hooks";
import { ScreenOnBoarding, ScreenSessionExpired } from "../../../components/screens";

export const withAuthorized = (ComposedComponet: ComponentType) =>
    (props: any) => {
        const { isAuthorized, isLoading } = useMe()
        const token = localStorage.getItem(BASE_AUTH_TOKEN);

        // if (isLoading) {
        //     return <ScreenOnBoarding />
        // }

        // if (!isAuthorized) {
        //     return !!token ? <ScreenSessionExpired /> : null;
        // }

        return <ComposedComponet {...props} />
    }