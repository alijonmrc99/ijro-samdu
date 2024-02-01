import { FC, useMemo } from "react";
import './styles.scss'
import { IBusinessTrip } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_USERS } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";


export const BusinessTripList: FC<{
    isLoading: boolean,
    list: IBusinessTrip[],
    onDelete: (id: any) => void,
    isDeleting?: boolean
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_USERS}/${value.id}`)
    }

    const columns = useMemo(() => [
        {
            title: t('name'),
            dataIndex: 'full_name',
            key: 'full_name'
        },
        {
            title: t('travel_place'),
            dataIndex: 'travel_place',
            key: 'travel_place',
        },
        {
            title: t('job'),
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: t('start_date'),
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: t('end_date'),
            dataIndex: 'end_date',
            key: 'end_date',
        },

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


