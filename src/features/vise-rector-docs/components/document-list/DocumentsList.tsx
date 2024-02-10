import { FC, useMemo } from "react";
import './styles.scss'
import { IDocuments } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_DOCUMENTS } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Badge, Button } from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

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
            width: 300,
            key: 'title'
        },
        {
            title: t('title'),
            dataIndex: 'name',
            width: 300,
            key: 'name'
        },

        {
            title: t('date'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => (
                <div>{date.split("T")[0]}</div>
            )
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: "status",
            render: (status: "seen" | "approved" | "rejected" | null,) => (
                <div>
                    {status === 'rejected' ? <Button className="rejected">{t('rejected')}</Button> :
                        status === "seen" ? <Button className="seen"><Badge style={{ marginRight: "10px" }} status="processing" /> {t('waiting')}</Button> :
                            status === 'approved' ? <Button className="approved">{t('approved')}</Button> :
                                ""
                    }
                </div>
            )
        },
        {
            title: t('approved_date'),
            dataIndex: 'approvedAt',
            key: "approvedAt",
            render: (date: string) => (
                <div>{date?.split(" ")[0]}</div>
            )
        },
        editColumnsType((id: any) => {
            navigate(`${ROUTE_DASHBOARD}/${ROUTE_DOCUMENTS}/${id}/edit`)
        }),
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

export const editColumnsType = (onEdit: (id: any) => void): ColumnType<any> => {

    return {
        title: '',
        width: 64,
        key: 'action',
        fixed: 'right',
        render: (item: any) => <Button
            disabled={item.isSent}
            type="primary"
            icon={<EditFilled />}
            onClick={(e) => {
                e.stopPropagation();
                onEdit(item.id)
            }}
        />,
    }
}