import { FC, useContext, useEffect } from "react";
import { Layout } from "antd";
import { DocumentsList } from "../../../features/register-docs/components/document-list";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchRegDocuments } from "../../../features/register-docs/thunks";
import { HttpApi } from "../../../common/http";
import { useTranslation } from "react-i18next";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { MainPagination } from "../../../components/main-pagination";
import { IPaginationData, PaginationContext } from "../../../common/contexts/pagination.context";
import { RegTopMenu } from "../../../components/top-menu";
import { FilterContext, IFilter } from "../../../common/contexts/filter.context";
export const http = new HttpApi()

export const RegDocuments: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.registerDocs);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { pagination, setPagination } = useContext(PaginationContext) as IPaginationData
    const { filter } = useContext(FilterContext) as IFilter
    useEffect(() => {
        setPageTitle(t('my-documents'))
    }, [t])


    const onChange = (data: any) => {
        setPagination(data)
    }

    useEffect(() => {
        dispatch(fetchRegDocuments({ ...pagination, ...filter }))
    }, [pagination, filter]);


    return (
        <Layout>
            <ContentHeader>
                <MainBreadcrumb />
                <div></div>
                <MainPagination defaultcurrent={data?.meta.currentPage || 1} onChange={onChange} total={data?.meta.total || 1} pageSize={data?.meta.perPage || 30} />
            </ContentHeader>
            <RegTopMenu />
            <div className="page__content">
                <DocumentsList list={data?.items || []} isLoading={isLoading} />
            </div>
        </Layout>
    )
}