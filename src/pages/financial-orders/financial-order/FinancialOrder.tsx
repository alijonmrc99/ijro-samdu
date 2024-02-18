import { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { FinancialOrdersForm } from "../../../features/financial-orders/components";
import { financialOrderSlice } from "../../../features/financial-orders/sclices";

export const FinancialOrder: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.appeal)

    useEffect(() => {
        setPageTitle(data?.acceptedDateAndIndex || "");
    }, [data])

    useEffect(() => {
        return () => { dispatch(financialOrderSlice.actions.emptyState()) }
    }, [])


    return (
        <div className="pages">
            <Helmet>
                <title>{data?.acceptedDateAndIndex || t("create")}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.acceptedDateAndIndex || t('create') }} />
            </ContentHeader>
            <div className="pages__content doc-content" >
                <FinancialOrdersForm />
            </div>

        </div>
    )
}