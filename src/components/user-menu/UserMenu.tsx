import { DownCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Flex } from "antd";
import type { MenuProps } from 'antd';
import { FC } from "react";
import { useAppSelector } from "../../store";
import './style.scss'
import { useTranslation } from "react-i18next";
import { useLogout } from "../../features/auth/hooks";

export const UserMenu: FC = () => {
    const { handleLogout } = useLogout()
    const { data: user } = useAppSelector(state => state.me);
    const { t } = useTranslation()
    const items: MenuProps['items'] = [
        {
            label: <button className="logout_btn"><LogoutOutlined style={{ fontSize: "20px", marginRight: "10px" }} />{t('logout')} </button>,
            key: 0
        }
    ]
    const onClick: MenuProps['onClick'] = () => {
        handleLogout();
    }

    return (
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <Flex justify="space-between" className="user-content">
                <div>
                    <div className="user_name">{user?.fullName}</div>
                    <div className="user_job">{user?.job || "Lorem ipsum dolor sit amet consectetur adipisicing elit"} </div>
                </div>
                <DownCircleOutlined style={{ fontSize: "20px" }} />
            </Flex>
        </Dropdown>

    )
}