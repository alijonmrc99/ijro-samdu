import { FC, useMemo } from "react";
import './styles.scss'
import { IUser } from "../../models";
import { DataTable } from "../../../../components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD, ROUTE_USERS } from "../../../../common/constants";
import { useTranslation } from "react-i18next";
import { ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { IRole } from "../../../auth/models";

export const UserList: FC<{
    isLoading: boolean,
    list: IUser[],
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
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: t('username'),
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: t('job'),
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: t('roles'),
            dataIndex: 'roles',
            key: 'roles',
            render: (roles: IRole[]) => roles.map(role => (
                <div>{t(role?.name)}</div>
            ))

        },

        editColumnsType((id: any) => {
            navigate(`${ROUTE_DASHBOARD}/${ROUTE_USERS}/${id}`)
        }),
        // deleteColumnsType(!!isDeleting, onDelete),
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