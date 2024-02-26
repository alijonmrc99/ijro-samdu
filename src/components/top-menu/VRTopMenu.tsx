import { FC, useContext, useMemo, } from "react";
import { FilterContext, IFilter } from "../../common/contexts/filter.context";
import { Menu, MenuProps } from "antd";
import { ClockCircleOutlined, FileDoneOutlined, FileExclamationOutlined, FileTextOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import "./sytle.scss"
import { useTranslation } from "react-i18next";
import { IPaginationData, PaginationContext } from "../../common/contexts/pagination.context";
export const VRTopMenu: FC = () => {
    const { setFilter } = useContext(FilterContext) as IFilter;
    const { setPagination } = useContext(PaginationContext) as IPaginationData;
    const { t } = useTranslation()
    const items: MenuProps['items'] = useMemo(() => [
        {
            label: t('all_docs'),
            key: 'all',
            title: "all",
            icon: <FileTextOutlined />,
        },
        {
            label: t('save_docs'),
            key: "isSend=false",
            title: "isSend",
            icon: <SaveOutlined />,
        },
        {
            label: t('sent_docs'),
            key: 'isSend=true',
            title: "isSend",
            icon: <UploadOutlined />,
        },
        {
            label: t('waiting'),
            key: 'seen',
            title: "status",
            icon: <ClockCircleOutlined />,
        },
        {
            label: t('approved_docs'),
            key: 'approved',
            title: "status",
            icon: <FileDoneOutlined />,
        },
        {
            label: t('rejected_docs'),
            key: 'rejected',
            title: "status",
            icon: <FileExclamationOutlined />,
        },
    ], [setFilter, t])



    const onClick = (event: any) => {
        setFilter({})
        setPagination({ perPage: 30, page: 1 })
        if (event.key === "isSend=true") {
            setFilter({
                isSent: {
                    eq: 1
                }
            })
        } else if (event.key === "isSend=false") {
            setFilter({
                isSent: {
                    eq: 0
                }
            })
        } else if (event.item.props.title === "status") {
            setFilter({
                status: {
                    eq: event.key
                }
            })
        }
    }

    return <div className="top-menu">
        <Menu defaultSelectedKeys={['all']} onClick={onClick} mode="horizontal" items={items} />
    </div>
}