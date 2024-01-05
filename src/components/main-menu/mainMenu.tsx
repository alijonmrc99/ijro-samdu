import { Menu } from "antd";
import { FC, useMemo } from "react";
import { ROUTE_DOCUMENTS, RoleTypeEnums } from "../../common/constants";
import { FolderOpenOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";

export const MainMenu: FC = () => {
    const { t } = useTranslation()
    const items = useMemo(() => [
        {
            key: ROUTE_DOCUMENTS,
            icon: <FolderOpenOutlined />,
            label: t("documents"),
            roles: RoleTypeEnums.ROLE_VISE_RECTOR
        },

    ], [])



    return (
        <Menu>

        </Menu>
    )
}