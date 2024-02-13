import { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { distributionSlice } from "../../../features/distributions/sclices";
import { DistributionForm } from "../../../features/distributions/components";

export const Distribution: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.distribution)

    useEffect(() => {
        setPageTitle(data?.applicant || "");
    }, [data])

    useEffect(() => {
        return () => { dispatch(distributionSlice.actions.emptyState()) }
    }, [])

    return (
        <div className="pages">
            <Helmet>
                <title>{data?.applicant || t("create")}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.applicant || t('create') }} />
            </ContentHeader>
            <div className="pages__content doc-content" >
                <DistributionForm />
            </div>

        </div>
    )
}