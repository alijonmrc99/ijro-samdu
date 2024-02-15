import { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { AppealForm } from "../../../features/appeals/components";
import { appealSlice } from "../../../features/appeals/sclices";

export const Appeal: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.appeal)

    useEffect(() => {
        setPageTitle(data?.indexAndCreatedAt || "");
    }, [data])

    useEffect(() => {
        return () => { dispatch(appealSlice.actions.emptyState()) }
    }, [])


    return (
        <div className="pages">
            <Helmet>
                <title>{data?.indexAndCreatedAt || t("create")}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.indexAndCreatedAt || t('create') }} />
            </ContentHeader>
            <div className="pages__content doc-content" >
                <AppealForm />
            </div>

        </div>
    )
}