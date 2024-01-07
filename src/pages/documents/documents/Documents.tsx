import { FC, useContext, useEffect, useState } from "react";
import { Layout, Modal } from "antd";
import { DocumentsList } from "../../../features/documents/components/document-list";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchDocuments } from "../../../features/documents/thunks";
import { HttpApi } from "../../../common/http";
import { ENDPOINT_DOCUMENTS } from "../../../features/documents/endpoints";
import { ID } from "../../../common/models";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
export const http = new HttpApi()

export const Documents: FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false)
    const { data, isLoading } = useAppSelector(state => state.documents);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext

    useEffect(() => {
        dispatch(fetchDocuments({}))
    }, []);

    useEffect(() => {
        setPageTitle(t('my-documents'))
    }, [t])


    const onDelete = (id: ID) => {
        setIsDeleting(true);
        http.delete(`${ENDPOINT_DOCUMENTS}/${id}`, {}).then(_ => {
            dispatch(fetchDocuments({})).finally(() => setIsDeleting(false))
        })
    }

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
    }

    return (
        <Layout>
            <DocumentsList isDeleting={isDeleting} onDelete={confirm} list={data?.items || []} isLoading={isLoading} />
        </Layout>
    )
}