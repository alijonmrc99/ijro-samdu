import { FC, useMemo } from "react";
import './styles.scss'
import { IDocuments } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_INCOMNG_DOCS } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { Badge, Button } from "antd";
import './styles.scss'
export const DocumentsList: FC<{
    isLoading: boolean,
    list: IDocuments[]
}> = ({ isLoading, list }) => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_INCOMNG_DOCS}/${value.id}`)
    }

    const columns = useMemo(() => [
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            width: 300,
            render: (name: string) => (
                <div className="doc-title">{name}</div>
            )
        },
        {
            title: t('user'),
            dataIndex: 'user',
            key: 'user',
            width: 180,
            render: ((user: { fullName: string }) => (
                <div>{user.fullName}</div>
            ))

        },
        {
            title: t('title'),
            dataIndex: 'title',
            key: 'title',
            width: 350,
            render: (title: string) => (
                <div className="doc-title">{title}</div>
            )
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
            title: t('approved_date'),
            dataIndex: 'approvedAt',
            key: "approvedAt",
            render: (date: string) => (
                <div>{date?.split(" ")[0]}</div>
            )
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: "status",
            render: (status: "seen" | "approved" | "rejected" | null,) => (
                <div>
                    {status === 'rejected' ? <Button className="rejected">{t('rejected')}</Button> :
                        status === "seen" ? <Button className="seen"><Badge style={{ marginRight: "10px" }} status="processing" /> {t('seen')}</Button> :
                            status === 'approved' ? <Button className="approved">{t('approved')}</Button> :
                                <Button className="not_open">{t('not_open')}</Button>
                    }
                </div>
            )
        },

    ], [t, list])



    return (
        <DataTable columns={columns} onSelectRow={onSelectRow} isLoading={isLoading} data={list || []} />
    )
}

