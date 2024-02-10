import { FC, useMemo } from "react";
import './styles.scss'
import { IExecutiveOrdersResponse } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_EXECUTIVE_ORDER } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DownlaodFile } from "../../../../components/download-file";


export const ExecutiveOrdersList: FC<{
    isLoading: boolean,
    list: IExecutiveOrdersResponse[],
    onDelete: (id: any) => void,
    isDeleting?: boolean
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_EXECUTIVE_ORDER}/${value.id}`)
    }

    const columns = useMemo(() => [
        {
            title: t('date'),
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: t('number'),
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: t('summary'),
            dataIndex: 'summary',
            key: 'summary',
        },
        {
            title: t('project_introducer'),
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: t('executor'),
            dataIndex: 'executor',
            key: 'executor',
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
            return (<DownlaodFile fileName={item.fileName} path={ROUTE_EXECUTIVE_ORDER} />)
        }
    }
}


