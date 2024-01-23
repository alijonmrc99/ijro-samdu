import { FC } from "react";
import { withAuthorized } from "../features/auth/hocs";
import { Outlet } from "react-router-dom";
import { MainHeader } from "../components/main-header";
import { Col, Layout, Row } from "antd";
import { MainMenu } from "../components/main-menu";
import './style.scss';
import { Filter } from "../components/filter";
export const DashboardBase: FC = withAuthorized(() => {
    return (
        <Layout>
            <MainHeader />
            <Row className="main-view">
                <Col className="sidebar" span={4}>
                    <MainMenu />
                    <Filter />
                </Col>
                <Col className="main-content" span={20}>
                    <Outlet />
                </Col>
            </Row>
        </Layout>
    )
})