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
import { BusinessTripForm } from "../../../features/busines-trip/components";
import './sytles.scss';
import { tripSlice } from "../../../features/busines-trip/sclices";

export const BusinessTrip: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.trip)

    useEffect(() => {
        setPageTitle(data?.fullName || "");
    }, [data])

    useEffect(() => {
        return () => { dispatch(tripSlice.actions.emptyState()) }
    }, [])


    return (
        <div className="pages">
            <Helmet>
                <title>{data?.fullName || t("create")}</title>
            </Helmet>
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: data?.fullName || t('create') }} />
                <Button className="print" onClick={printPage} > <PrinterOutlined />{t('print')}</Button>
                <div></div>
            </ContentHeader>
            <div className="pages__content doc-content" >
                <BusinessTripForm />
            </div>

        </div>
    )
}