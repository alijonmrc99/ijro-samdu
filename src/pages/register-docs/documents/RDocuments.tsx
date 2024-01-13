import { FC, useContext, useEffect, useState } from "react";
import { Button, Layout, Modal } from "antd";
import { DocumentsList } from "../../../features/register-docs/components/document-list";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchDocuments } from "../../../features/register-docs/thunks";
import { HttpApi } from "../../../common/http";
import { ENDPOINT_DOCUMENTS } from "../../../features/register-docs/endpoints";
import { ID } from "../../../common/models";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined, FileAddOutlined } from "@ant-design/icons";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useNavigate } from "react-router-dom";
import { MainPagination } from "../../../components/main-pagination";
import { IPaginationData, PaginationContext } from "../../../common/contexts/pagination.context";
export const http = new HttpApi()

export const RDocuments: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { data, isLoading } = useAppSelector(state => state.documents);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { pagination, setPagination } = useContext(PaginationContext) as IPaginationData

    useEffect(() => {
        setPageTitle(t('my-documents'))
    }, [t])


    const onDelete = (id: ID) => {
        setIsDeleting(true);
        http.delete(`${ENDPOINT_DOCUMENTS}/${id}`, {}).then(_ => {
            dispatch(fetchDocuments({ ...pagination }))
        }).finally(() => setIsDeleting(false))
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

    const onChange = (data: any) => {
        setPagination(data)
    }

    useEffect(() => {
        dispatch(fetchDocuments({ ...pagination }))
    }, [pagination]);


    return (
        <Layout>
            <ContentHeader>
                <MainBreadcrumb />
                <div></div>
                <MainPagination defaultcurrent={data?.meta.currentPage || 1} onChange={onChange} total={data?.meta.total || 1} pageSize={data?.meta.perPage || 30} />
                <Button onClick={() => navigate('/dashboard/documents/create')} type="primary"> <FileAddOutlined />{t('create_doc')}</Button>
            </ContentHeader>

            <div className="pages__content">
                <DocumentsList isDeleting={isDeleting} onDelete={confirm} list={data?.items || []} isLoading={isLoading} />
            </div>
        </Layout>
    )
}