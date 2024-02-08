import { Menu } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { ROUTE_BUS_TRIP, ROUTE_DOCUMENTS, ROUTE_INCOMNG_DOCS, ROUTE_MAILED_LETTER, ROUTE_ME, ROUTE_USERS, RoleTypeEnums } from "../../common/constants";
import { FolderOpenOutlined, MailOutlined, ShareAltOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import './sytle.scss'
export const MainMenu: FC = () => {
    const { pathname } = useLocation();
    const { data: user } = useAppSelector(state => state.me)
    const { t } = useTranslation()
    const navigate = useNavigate();
    const items = useMemo(() => [
        {
            key: ROUTE_DOCUMENTS,
            icon: <FolderOpenOutlined />,
            label: t("documents"),
            roles: [RoleTypeEnums.ROLE_VISE_RECTOR,]
        },
        {
            key: ROUTE_INCOMNG_DOCS,
            icon: <FolderOpenOutlined />,
            label: t("documents"),
            roles: [RoleTypeEnums.ROLE_REGISTER]
        },
        {
            key: ROUTE_USERS,
            icon: <UsergroupAddOutlined />,
            label: t("users"),
            roles: [RoleTypeEnums.ROLE_REGISTER]
        },
        {
            key: ROUTE_BUS_TRIP,
            icon: <ShareAltOutlined />,
            label: t("business_trip"),
            roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY]
        },
        {
            key: ROUTE_MAILED_LETTER,
            icon: <MailOutlined />,
            label: t("mailed_letters"),
            roles: [RoleTypeEnums.ROLE_REGISTER, RoleTypeEnums.ROLE_SECRETARY]
        },
        {
            key: ROUTE_ME,
            icon: <UserOutlined />,
            label: t("profile"),
        },

    ], [t])

    const [menuItems, setMenuItems] = useState(items);

    const filterMenu = () => {
        setMenuItems(
            items.filter(menu => {
                if (!menu?.roles?.length) {
                    return true
                } else {
                    return user?.roles
                        .map(role => role.name)
                        .some(role => menu.roles.includes(role))
                }
            })
        )
    }

    useEffect(() => {
        filterMenu();
    }, [user, t, pathname])

    const onSelect = (selectedMenu: {
        key: string,
        selectedKeys: string[],
        keyPath: string[]
    }) => {
        navigate(selectedMenu.keyPath.reverse().join('/'))
    }
    return (
        <div className="main-menu">
            <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={[pathname?.split('/')[2]]}
                items={menuItems}
                onSelect={onSelect}
            />
        </div>
    )
}