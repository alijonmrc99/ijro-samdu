import { FC, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { FetchTripById } from "../../../features/busines-trip/thunks";
import { tripsSlice } from "../../../features/busines-trip/sclices";

export const BusinessTrip: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.trip)

    useEffect(() => {
        setPageTitle(data?.fullName || "");
    }, [data])

    useEffect(() => {
        dispatch(FetchTripById(id))
        return () => { dispatch(tripsSlice.actions.emptyState()) }

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