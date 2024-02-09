import { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { ExecutiveOrderForm } from "../../../features/executive-orders/components";
import { executiveOrderSlice } from "../../../features/executive-orders/sclices";

export const ExecutiveOrder: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.executiveOrder)

    useEffect(() => {
        setPageTitle(data?.number || "");
    }, [data])

    useEffect(() => {
        return () => { dispatch(executiveOrderSlice.actions.emptyState()) }
    }, [])

    return (
        <div className="pages">
            <Helmet>
                <title>{data?.number || t("create")}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.number || t('create') }} />
            </ContentHeader>
            <div className="pages__content doc-content" >
                <ExecutiveOrderForm />
            </div>

        </div>
    )
}