import { FC, useMemo } from "react";
import './styles.scss'
import { IMailledLettersResponse } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_MAILED_LETTER } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";


export const MailedLettersList: FC<{
    isLoading: boolean,
    list: IMailledLettersResponse[],
    onDelete: (id: any) => void,
    isDeleting?: boolean
}> = ({ isLoading, list, onDelete, isDeleting }) => {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const onSelectRow = (_index: any, value: any) => {
        navigate(`${ROUTE_DASHBOARD}/${ROUTE_MAILED_LETTER}/${value.id}`)
    }

    const columns = useMemo(() => [
        {
            title: t('place_person'),
            dataIndex: 'sentPlacePerson',
            key: 'sentPlacePerson'
        },
        {
            title: t('date'),
            dataIndex: 'sentAt',
            key: 'sentAt',
        },
        {
            title: t('cost'),
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: t('comment'),
            dataIndex: 'commnet',
            key: 'commnet',
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



