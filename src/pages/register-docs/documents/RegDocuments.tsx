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
export const http = new HttpApi()

export const RegDocuments: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.registerDocs);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { pagination, setPagination } = useContext(PaginationContext) as IPaginationData

    useEffect(() => {
        setPageTitle(t('my-documents'))
    }, [t])


    const onChange = (data: any) => {
        setPagination(data)
    }

    useEffect(() => {
        dispatch(fetchRegDocuments({ ...pagination }))
    }, [pagination]);


    return (
        <Layout>
            <ContentHeader>
                <MainBreadcrumb />
                <div></div>
                <MainPagination defaultcurrent={data?.meta.currentPage || 1} onChange={onChange} total={data?.meta.total || 1} pageSize={data?.meta.perPage || 30} />
            </ContentHeader>

            <div className="pages__content">
                <DocumentsList list={data?.items || []} isLoading={isLoading} />
            </div>
        </Layout>
    )
}