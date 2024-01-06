import { FC, useMemo } from "react";
import './styles.scss'
import { IDocuments } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
export const DocumentsList: FC<{
    isLoading: boolean,
    list: IDocuments[],
    onDelete: (id: any) => void,
    isDeleting?: boolean
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/${value.id}`)
    }

    const columns = useMemo(() => [
        {
            title: t('name'),
            dataIndex: 'title',
            key: 'title'
        },

        {
            title: t('is_sent'),
            dataIndex: 'isSent',
            key: "isSent",
            render: (isSent: boolean) => (
                <div>{isSent ? <Button type="text" style={{ borderColor: "#28A745", color: "#28A745" }}>{t('sent')}</Button> :
                    <Button type="text" style={{ borderColor: "#ECA52B", color: "#ECA52B" }}>{t('not_sent')}</Button>}  </div>
            )
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: "status"
        },
        deleteColumnsType(!!isDeleting, onDelete)
    ], [])

    return (
        <DataTable columns={columns} onSelectRow={onSelectRow} isLoading={isLoading} data={list || []} />
    )
}

export const deleteColumnsType = (isDeleting: boolean, onDelete: (id: any) => void): ColumnType<any> => {
    return {
        title: ' ',
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