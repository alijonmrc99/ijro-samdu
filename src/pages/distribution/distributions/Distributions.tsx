import { FC, useContext, useEffect, useState } from "react";
import { Button, Layout, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { MainPagination } from "../../../components/main-pagination";
import { IPaginationData, PaginationContext } from "../../../common/contexts/pagination.context";
import { FilterContext, IFilter } from "../../../common/contexts/filter.context";
import { Helmet } from "react-helmet";
import { ExclamationCircleOutlined, FileAddOutlined } from "@ant-design/icons";
import { ID } from "../../../common/models";
import { http } from "../../vise-reactor-docs";
import { useNavigate } from "react-router-dom";
import { ROUTE_CREATE, ROUTE_DASHBOARD, ROUTE_DISTRIBUTION } from "../../../common/constants";

import { DistributionsList } from "../../../features/distributions/components";
import { fetchDistributions } from "../../../features/distributions/thunks";
import { ENDPOINT_DISTRIBUTION } from "../../../features/distributions/endpoints";

export const Distributions: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.distributions);
    const [isDeleting, setIsDeleting] = useState(false);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext;
    const { pagination, setPagination } = useContext(PaginationContext) as IPaginationData;
    const { filter } = useContext(FilterContext) as IFilter;
    const navigate = useNavigate();

    useEffect(() => {
        setPageTitle(t('distribution'))
    }, [t])

    const onDelete = (id: ID) => {
        setIsDeleting(true);
        http.delete(`${ENDPOINT_DISTRIBUTION}/${id}`, {}).then(_ => {
            dispatch(fetchDistributions({ ...pagination, ...filter }))
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
        dispatch(fetchDistributions({ ...pagination, ...filter }))
    }, [pagination, filter]);


    return (
        <Layout>
            <Helmet>
                <title>{t('distribution')}</title>
            </Helmet>
            <ContentHeader>
                <MainBreadcrumb />
                <div></div>
                <MainPagination defaultcurrent={data?.meta.currentPage || 1} onChange={onChange} total={data?.meta.total || 1} pageSize={data?.meta.perPage || 30} />
                <Button onClick={() => navigate(`${ROUTE_DASHBOARD}/${ROUTE_DISTRIBUTION}/${ROUTE_CREATE}`)} type="primary"> <FileAddOutlined />{t('create')}</Button>
            </ContentHeader>
            <div className="page__content">
                <DistributionsList isDeleting={isDeleting} onDelete={confirm} list={data?.items || []} isLoading={isLoading} />
            </div>
        </Layout>
    )
}