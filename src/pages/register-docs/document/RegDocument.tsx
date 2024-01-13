import { FC, useContext, useEffect, useState } from "react";
import { RegdocFetchById } from "../../../features/register-docs/thunks";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { DocumentView } from "../../../components/documnet-view";
import { Button, Modal, Spin } from "antd";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { printPage } from "../../../common/utils/functions";
import { EditOutlined, LoadingOutlined, PrinterOutlined, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS } from "../../../common/constants";
import { registerDocSlice } from "../../../features/register-docs/sclices/registerDoc.slice";

import './sytles.scss';

export const RegDocument: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const [isSending, setIsSending] = useState(false)
    const { data, isLoading } = useAppSelector(state => state.registerDoc)

    useEffect(() => {
        setPageTitle(data?.title || "");

    }, [data])

    useEffect(() => {
        dispatch(RegdocFetchById(id))
        return () => { dispatch(registerDocSlice.actions.emptyState()) }
    }, [])



    const confirm = () => {
        Modal.confirm({
            title: t('confirm'),
            icon: <SendOutlined />,
            content: t('sent_confirmation_message'),
            okText: t('confirm'),
            cancelText: t('cancel'),
            onCancel: () => { },
            onOk: () => { }
        })
    }

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
                    isLoading ? <Spin tip="loading" /> :
                        <DocumentView status={data?.status || null} contentText={data?.body || ""} />
                }

            </div>
        </div>
    )
}