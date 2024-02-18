import { FC, useMemo } from "react";
import './styles.scss'
import { IAppealsResponse } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_INNER_APPEAL } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DownlaodFile } from "../../../../components/download-file";
import { ENDPOINT_INNER_APPEAL } from "../../endpoints";


export const InnerAppealList: FC<{
    isLoading: boolean,
    list: IAppealsResponse[],
    onDelete: (id: any) => void,
    isDeleting?: boolean
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_INNER_APPEAL}/${value.id}`)
    }

    const columns = useMemo(() => [
        {
            title: t('index_and_date'),
            dataIndex: 'acceptedDateAndIndex',
            key: 'acceptedDateAndIndex'
        },
        {
            title: t('date'),
            dataIndex: 'givenDate',
            key: 'givenDate',
        },
        {
            title: t('creator'),
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: t('title_or_summary'),
            dataIndex: 'titleOrSummary',
            key: 'titleOrSummary',
        },
        {
            title: t('resolution'),
            dataIndex: 'resolution',
            key: 'resolution',
        },
        {
            title: t('performer_date'),
            dataIndex: 'performerAndDate',
            key: 'performerAndDate',
        },
        {
            title: t('executed_sign'),
            dataIndex: 'performedSign',
            key: 'performedSign',
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
            return (<DownlaodFile fileName={item.fileName} path={ENDPOINT_INNER_APPEAL.slice(1)} />)
        }
    }
}


