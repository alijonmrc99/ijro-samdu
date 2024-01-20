import { FC, useContext, useEffect, useState } from "react";
import { VRdocFetchById } from "../../../features/vise-rector-docs/thunks";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { DocumentView } from "../../../components/documnet-view";
import { Button, Modal, Spin } from "antd";
import { vrDocSlice } from "../../../features/vise-rector-docs/sclices/vise-rector-doc.slice";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { printPage } from "../../../common/utils/functions";
import { EditOutlined, LoadingOutlined, PrinterOutlined, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { http } from "..";
import { ENDPOINT_DOCUMENTS, ENDPOINT_SEND } from "../../../features/vise-rector-docs/endpoints";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS } from "../../../common/constants";

import './sytles.scss'

export const Document: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const [isSending, setIsSending] = useState(false)
    const { data, isLoading } = useAppSelector(state => state.vrDoc)

    useEffect(() => {
        setPageTitle(data?.title || "");

    }, [data])

    useEffect(() => {
        dispatch(VRdocFetchById(id))
        return () => { dispatch(vrDocSlice.actions.emptyState()) }
    }, [])

    const onSend = () => {
        setIsSending(true);
        http.post(`${ENDPOINT_DOCUMENTS}/${id}/${ENDPOINT_SEND}`, {})
            .then(_res => setIsSending(false));
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}`)
    };


    const confirm = () => {
        Modal.confirm({
            title: t('confirm'),
            icon: <SendOutlined />,
            content: t('sent_confirmation_message'),
            okText: t('confirm'),
            cancelText: t('cancel'),
            onCancel: () => { },
            onOk: onSend
        })
    };

    return (
        <div className="pages">
            <Helmet>
                <title>{data?.title}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.title || "Loading..." }} />
                <Button className="print" onClick={printPage} > <PrinterOutlined />{t('print')}</Button>
                <div></div>
                {!data?.isSent &&
                    <Button onClick={() => navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/${id}/edit`)} type="primary"> <EditOutlined />{t('edit_doc')}</Button>
                }
                {!data?.isSent &&
                    <Button className="send-btn" onClick={confirm} >{isSending ? <LoadingOutlined /> : <SendOutlined />} {t('sent_document')}</Button>
                }
            </ContentHeader>
            <div className="pages__content doc-content" >
                {
                    isLoading ? <Spin tip="loading" /> :
                        <DocumentView user={data?.user.fullName || ""} job={data?.user.job || ""} name="1321" status={data?.status || null} contentText={data?.body || ""} />
                }

            </div>
        </div>
    )
}