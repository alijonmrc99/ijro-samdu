import { Menu } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { ROUTE_DOCUMENT, ROUTE_DOCUMENTS, ROUTE_INCOMNG_DOCS, RoleTypeEnums } from "../../common/constants";
import { FolderOpenOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import './sytle.scss'
import Sider from "antd/es/layout/Sider";
export const MainMenu: FC = () => {
    const { data: user } = useAppSelector(state => state.me)
    const { t } = useTranslation()
    const navigate = useNavigate();
    const items = useMemo(() => [
        {
            key: ROUTE_DOCUMENTS,
            icon: <FolderOpenOutlined />,
            label: t("documents"),
            roles: [RoleTypeEnums.ROLE_VISE_RECTOR, RoleTypeEnums.ROLE_REGISTER],
            // children: [
            //     {
            //         key: ROUTE_DOCUMENT,
            //         icon: <FolderOpenOutlined />,
            //         label: t("documents"),
            //     }
            // ]
        },
        {
            key: ROUTE_INCOMNG_DOCS,
            icon: <FolderOpenOutlined />,
            label: t("documents"),
            roles: [RoleTypeEnums.ROLE_VISE_RECTOR]
        },

    ], [t])

    const [menuItems, setMenuItems] = useState(items);
    const { pathname } = useLocation();
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
    }, [user, t])

    const onSelect = (selectedMenu: {
        key: string,
        selectedKeys: string[],
        keyPath: string[]
    }) => {
        console.log(selectedMenu);

        navigate(selectedMenu.keyPath.reverse().join('/'))
    }
    return (
        <div className="main-menu">
            <Menu
                mode="inline"
                theme="light"
                defaultOpenKeys={[pathname?.split('/')[2]]}
                items={menuItems}
                onSelect={onSelect}
            />
        </div>
    )
}