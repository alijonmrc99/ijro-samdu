import { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { InnerAppealForm } from "../../../features/inner-appeals/components";
import { innerAppealSlice } from "../../../features/inner-appeals/sclices";

export const InnerAppeal: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.innerAppeal)

    useEffect(() => {
        setPageTitle(data?.acceptedDateAndIndex || "");
    }, [data])

    useEffect(() => {
        return () => { dispatch(innerAppealSlice.actions.emptyState()) }
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
                <InnerAppealForm />
            </div>

        </div>
    )
}