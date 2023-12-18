import { FC } from "react";
import { withAuthorized } from "../features/hocs";
import { useAppSelector } from "../store";

export const DashboardBase: FC = withAuthorized(() => {
    const { data } = useAppSelector(state => state.me);

    return (
        <h1>Siz accountingizga kirdingiz</h1>
    )
})