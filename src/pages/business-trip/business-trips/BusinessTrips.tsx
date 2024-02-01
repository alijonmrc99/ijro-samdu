import { FC, useContext, useEffect, useState } from "react";
import { Button, Layout, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useTranslation } from "react-i18next";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { MainPagination } from "../../../components/main-pagination";
import { IPaginationData, PaginationContext } from "../../../common/contexts/pagination.context";
import { FilterContext, IFilter } from "../../../common/contexts/filter.context";
import { Helmet } from "react-helmet";
import { Filter } from "../../../components/filter";
import { fetchTrips } from "../../../features/busines-trip/thunks";
import { BusinessTripList } from "../../../features/busines-trip/components";
import { ExclamationCircleOutlined, FileAddOutlined } from "@ant-design/icons";
import { ENDPOINT_BUS_TRIP } from "../../../features/busines-trip/endpoints";
import { ID } from "../../../common/models";
import { http } from "../../vise-reactor-docs";
import { IBusinessTrip } from "../../../features/busines-trip/models";
import { useNavigate } from "react-router-dom";
import { ROUTE_BUS_TRIP, ROUTE_CREATE, ROUTE_DASHBOARD } from "../../../common/constants";

export const BusinessTrips: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useAppSelector(state => state.trips);
    const [isDeleting, setIsDeleting] = useState(false);
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext;
    const { pagination, setPagination } = useContext(PaginationContext) as IPaginationData;
    const { filter } = useContext(FilterContext) as IFilter;
    const navigate = useNavigate();

    useEffect(() => {
        setPageTitle(t('users'))
    }, [t])

    const onDelete = (id: ID) => {
        setIsDeleting(true);
        http.delete(`${ENDPOINT_BUS_TRIP}/${id}`, {}).then(_ => {
            dispatch(fetchTrips({ ...pagination, ...filter }))
        }).finally(() => setIsDeleting(false))
    };

    const confirm = (id: ID) => {
        Modal.confirm({
            title: t('attention'),
            icon: <ExclamationCircleOutlined />,
            content: t('delete_confirmation_message'),
            okText: t('confirm'),
            cancelText: t('cancel'),
            onCancel: () => { },
            onOk: () => onDelete(id)
        })
    };

    const onChange = (data: any) => {
        setPagination(data)
    }

    useEffect(() => {
        dispatch(fetchTrips({ ...pagination, ...filter }))
    }, [pagination, filter]);

    const aa: IBusinessTrip[] = [
        {
            id: 1,
            full_name: "Mamasalayev Ruslan",
            job: "DFJSHBF",
            travel_place: "dsfsd",
            start_date: "2020-12-01",
            end_date: "2022-12-01"
        }
    ]

    return (
        <Layout>
            <Helmet>
                <title>{t('business_trip')}</title>
            </Helmet>
            <ContentHeader>
                <MainBreadcrumb />
                <div></div>
                <MainPagination defaultcurrent={data?.meta.currentPage || 1} onChange={onChange} total={data?.meta.total || 1} pageSize={data?.meta.perPage || 30} />
                <Button onClick={() => navigate(`${ROUTE_DASHBOARD}/${ROUTE_BUS_TRIP}/${ROUTE_CREATE}`)} type="primary"> <FileAddOutlined />{t('create')}</Button>
            </ContentHeader>
            {/* <Filter /> */}
            <div className="page__content">
                <BusinessTripList isDeleting={isDeleting} onDelete={confirm} list={data?.items || []} isLoading={isLoading} />
            </div>
        </Layout>
    )
}