import { Flex, Layout } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Languages } from "../language/Language";

import './style.scss'
import logo from "../../assets/logo (2).png"
import { UserMenu } from "../user-menu";

const { Header } = Layout;

export const MainHeader: FC = () => {
    return (
        <Header className="main-header">
            <Flex justify="space-between" align="center">
                <Link to={"/"} className="logo">
                    <img src={logo} alt="Logo" />
                </Link>
                <Flex align="center">
                    <Languages />
                    <UserMenu />
                </Flex>
            </Flex>
        </Header>
    )
}