import { FC } from "react";
import { withAuthorized } from "../features/auth/hocs";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { MainHeader } from "../components/main-header";
import { Layout } from "antd";

export const DashboardBase: FC = withAuthorized(() => {

    const { t } = useTranslation();
    return (
        <Layout>
            <MainHeader />
            <h1>Assalomu alaykum  {t('welcome')}</h1>
            <Outlet />
        </Layout>
    )
})