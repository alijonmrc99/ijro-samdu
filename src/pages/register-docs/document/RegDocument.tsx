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
import { registerDocSlice } from "../../../features/register-docs/sclices/registerDoc.slice";

import './sytles.scss';
import { ConfirmModalDialog } from "../../../features/register-docs/components/document-form";

export const RegDocument: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data, isLoading } = useAppSelector(state => state.registerDoc)

    useEffect(() => {
        setPageTitle(data?.title || "");

    }, [data])

    useEffect(() => {
        dispatch(RegdocFetchById(id))
        return () => { dispatch(registerDocSlice.actions.emptyState()) }
    }, [])


    return (
        <div className="pages">
            <Helmet>
                <title>{data?.title}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.title || "Loading..." }} />
                <Button className="print" onClick={printPage} > <PrinterOutlined />{t('print')}</Button>
                <div></div>
            </ContentHeader>
            <div className="pages__content doc-content" >
                {
                    isLoading ? <Spin tip="loading" >__</Spin> :
                        <DocumentView status={data?.status || null} contentText={data?.body || ""} />
                }
            </div>
            <ConfirmModalDialog />
        </div>
    )
}