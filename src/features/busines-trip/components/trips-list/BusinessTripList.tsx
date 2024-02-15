import { FC, useMemo } from "react";
import './styles.scss'
import { IBusinessTripResponse } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_BUS_TRIP, ROUTE_DASHBOARD } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DownlaodFile } from "../../../../components/download-file";
import { ENDPOINT_BUSINESS_TRIP } from "../../endpoints";


export const BusinessTripList: FC<{
    isLoading: boolean,
    list: IBusinessTripResponse[],
    onDelete: (id: any) => void,
    isDeleting?: boolean
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_BUS_TRIP}/${value.id}`)
    }

    const columns = useMemo(() => [
        {
            title: t('name'),
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: t('travel_place'),
            dataIndex: 'travelPlace',
            key: 'travelPlace',
        },
        {
            title: t('job'),
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: t('start_date'),
            dataIndex: 'startDate',
            key: 'start_date',
        },
        {
            title: t('end_date'),
            dataIndex: 'endDate',
            key: 'endDate',
        },
        downloadColumnsType(),
        deleteColumnsType(!!isDeleting, onDelete),
    ], [t, list])

    return (
        <DataTable columns={columns} onSelectRow={onSelectRow} isLoading={isLoading} data={list || []} />
    )
}

export const deleteColumnsType = (isDeleting: boolean, onDelete: (id: any) => void): ColumnType<any> => {
    return {
        title: "",
        width: 64,
        key: 'action',
        fixed: 'right',
        render: (item: any) => <Button
            disabled={isDeleting || item.isSent}
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}
        />,
    }
}

export const downloadColumnsType = (): ColumnType<any> => {
    return {
        title: "",
        width: 64,
        key: 'action',
        fixed: 'right',
        render: (item: any) => {
            return (<DownlaodFile fileName={item.file_name} path={ENDPOINT_BUSINESS_TRIP.slice(1)} />)
        }
    }
}


