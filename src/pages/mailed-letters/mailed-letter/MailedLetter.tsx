import { FC, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Button } from "antd";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { printPage } from "../../../common/utils/functions";
import { PrinterOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { MailedLetterForm } from "../../../features/mailed-letters/components";
import { letterSlice } from "../../../features/mailed-letters/sclices";

export const MailedLetter: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.letter)

    useEffect(() => {
        setPageTitle(t('edit'));
    }, [data])

    useEffect(() => {
        return () => { dispatch(letterSlice.actions.emptyState()) }
    }, [])


    return (
        <div className="pages">
            <Helmet>
                <title>{data?.sentPlacePerson || t("create")}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.id || t('create') }} />
                <Button className="print" onClick={printPage} > <PrinterOutlined />{t('print')}</Button>
                <div></div>
            </ContentHeader>
            <div className="pages__content doc-content" >
                <MailedLetterForm />
            </div>

        </div>
    )
}