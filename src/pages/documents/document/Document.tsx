import { FC, useContext, useEffect, useState } from "react";
import { docFetchById } from "../../../features/documents/thunks";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { DocumentView } from "../../../components/documnet-view";
import { Button, Modal, Spin } from "antd";
import { documentSlice } from "../../../features/documents/sclices/document.slice";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { printPage } from "../../../common/utils/functions";
import { EditOutlined, LoadingOutlined, PrinterOutlined, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { http } from "..";
import { ENDPOINT_DOCUMENTS, ENDPOINT_SEND } from "../../../features/documents/endpoints";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS } from "../../../common/constants";
const sytle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh"
}

export const Document: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const [isSending, setIsSending] = useState(false)
    const { data, isLoading } = useAppSelector(state => state.document)

    useEffect(() => {
        setPageTitle(data?.title || "");

    }, [data])

    useEffect(() => {
        dispatch(docFetchById(id))
        return () => { dispatch(documentSlice.actions.emptyState()) }
    }, [])

    const onSend = () => {
        setIsSending(true);
        http.post(`${ENDPOINT_DOCUMENTS}/${id}/${ENDPOINT_SEND}`, {})
            .then(_res => setIsSending(false));
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}`)
    }


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
                {!data?.isSent &&
                    <>
                        <Button onClick={() => navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/${id}/edit`)} type="primary"> <EditOutlined />{t('edit_doc')}</Button>
                        <Button onClick={confirm} >{isLoading ? <LoadingOutlined /> : <SendOutlined />} {t('sent_document')}</Button>
                    </>
                }

            </ContentHeader>
            <div className="pages__content" style={sytle}>
                {
                    isLoading ? <Spin tip="loading" /> :
                        <DocumentView status={data?.status || null} contentText={data?.body || ""} />
                }

            </div>
        </div>
    )
}