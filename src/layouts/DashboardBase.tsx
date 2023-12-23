import { FC } from "react";
import { withAuthorized } from "../features/auth/hocs";
import { useAppSelector } from "../store";
import { useTranslation } from "react-i18next";

export const DashboardBase: FC = withAuthorized(() => {
    const { data } = useAppSelector(state => state.me);
    const { t } = useTranslation();
    return (
        <h1>Assalomu alaykum {data?.fullName} {t('welcome')}</h1>
    )
})