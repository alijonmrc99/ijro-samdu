import { FC, useContext, useEffect, useState } from "react";
import { Button, Layout, Modal } from "antd";
import { DocumentsList } from "../../../features/vise-rector-docs/components/document-list";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchVRDocuments } from "../../../features/vise-rector-docs/thunks";
import { HttpApi } from "../../../common/http";
import { ENDPOINT_DOCUMENTS } from "../../../features/vise-rector-docs/endpoints";
import { ID } from "../../../common/models";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined, FileAddOutlined } from "@ant-design/icons";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useNavigate } from "react-router-dom";
import { MainPagination } from "../../../components/main-pagination";
import { IPaginationData, PaginationContext } from "../../../common/contexts/pagination.context";
import { ROUTE_CREATE, ROUTE_DASHBOARD, ROUTE_DOCUMENTS, ROUTE_INCOMNG_DOCS, RoleTypeEnums } from "../../../common/constants";
import { VRTopMenu } from "../../../components/top-menu";
import { FilterContext, IFilter } from "../../../common/contexts/filter.context";
import { Helmet } from "react-helmet";
import { Filter } from "../../../components/filter";
export const http = new HttpApi()

export const Documents: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const { data: user } = useAppSelector(state => state.me)
    const { data, isLoading } = useAppSelector(state => state.vrDocs);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { pagination, setPagination } = useContext(PaginationContext) as IPaginationData
    const { filter } = useContext(FilterContext) as IFilter;
    useEffect(() => {
        setPageTitle(t('my-documents'))
    }, [t])


    const onDelete = (id: ID) => {
        setIsDeleting(true);
        http.delete(`${ENDPOINT_DOCUMENTS}/${id}`, { _method: "DELETE" }).then(_ => {
            dispatch(fetchVRDocuments({ ...pagination, ...filter }))
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
        // If user is Register change Route
        if (user?.roles.map(role => role.name).includes(RoleTypeEnums.ROLE_REGISTER))
            navigate(`${ROUTE_DASHBOARD}/${ROUTE_INCOMNG_DOCS}`)
        else {
            dispatch(fetchVRDocuments({ ...pagination, ...filter }))
        }
    }, [pagination, filter]);


    return (
        <Layout>
            <Helmet>
                <title>{t('documents')}</title>
            </Helmet>
            <ContentHeader>
                <MainBreadcrumb />
                <div></div>
                <MainPagination defaultcurrent={data?.meta.currentPage || 1} onChange={onChange} total={data?.meta.total || 1} pageSize={data?.meta.perPage || 30} />
                <Button onClick={() => navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/${ROUTE_CREATE}`)} type="primary"> <FileAddOutlined />{t('create')}</Button>
            </ContentHeader>
            <VRTopMenu />
            <Filter />
            <div className="pages__content">
                <DocumentsList isDeleting={isDeleting} onDelete={confirm} list={data?.items || []} isLoading={isLoading} />
            </div>
        </Layout>
    )
}