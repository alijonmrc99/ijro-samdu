import { FC, useContext, useEffect, useState } from "react";
import { Button, Layout, Modal } from "antd";
import { DocumentsList } from "../../../features/documents/components/document-list";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchDocuments } from "../../../features/documents/thunks";
import { HttpApi } from "../../../common/http";
import { ENDPOINT_DOCUMENTS } from "../../../features/documents/endpoints";
import { ID } from "../../../common/models";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined, FileAddOutlined } from "@ant-design/icons";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useNavigate } from "react-router-dom";
export const http = new HttpApi()

export const Documents: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { data, isLoading } = useAppSelector(state => state.documents);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext

    useEffect(() => {
        dispatch(fetchDocuments({}))
    }, [])

    useEffect(() => {
        setPageTitle(t('my-documents'))
    }, [t])


    const onDelete = (id: ID) => {
        setIsDeleting(true);
        http.delete(`${ENDPOINT_DOCUMENTS}/${id}`, {}).then(_ => {
            dispatch(fetchDocuments({})).finally(() => setIsDeleting(false))
        })
    };

    const confirm = (id: ID) => {
        Modal.confirm({
            title: t('attention'),
            icon: <ExclamationCircleOutlined />,
            content: t('delete_confirmation_message'),
            okText: t('confirm'),
            cancelText: t('cancel'),
            onCancel: () => { },
            onOk: () => onDelete(id)
        })
    };

    return (
        <Layout>
            <ContentHeader>
                <MainBreadcrumb />
                <div></div>
                <div></div>
                <Button onClick={() => navigate('/dashboard/documents/create')} type="primary"> <FileAddOutlined />{t('create_doc')}</Button>
            </ContentHeader>
            <div className="pages__content">
                <DocumentsList isDeleting={isDeleting} onDelete={confirm} list={data?.items || []} isLoading={isLoading} />
            </div>
        </Layout>
    )
}