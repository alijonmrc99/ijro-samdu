import { FC, useContext, useEffect } from "react";
import { RegdocFetchById } from "../../../features/register-docs/thunks";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { DocumentView } from "../../../components/documnet-view";
import { Button, Spin } from "antd";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { printPage } from "../../../common/utils/functions";
import { PrinterOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { UserForm } from "../../../features/users/components";
import { userSlice } from "../../../features/users/sclices/user.slice";
import { FetchUserById } from "../../../features/users/thunks";

export const User: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.registerDoc)

    useEffect(() => {
        setPageTitle(data?.title || "");
    }, [data])

    useEffect(() => {
        dispatch(FetchUserById(id))
        return () => { dispatch(userSlice.actions.emptyState()) }

    }, [])


    return (
        <div className="pages">
            <Helmet>
                <title>Foydalanuchilar</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.title || "Loading..." }} />
                <Button className="print" onClick={printPage} > <PrinterOutlined />{t('print')}</Button>
                <div></div>
            </ContentHeader>
            <div className="page__content">
                <UserForm />
            </div>


        </div>
    )
}