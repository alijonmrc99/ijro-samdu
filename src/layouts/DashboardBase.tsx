import { FC, useContext } from "react";
import { withAuthorized } from "../features/auth/hocs";
import { Outlet } from "react-router-dom";
import { MainHeader } from "../components/main-header";
import { Col, Layout, Row } from "antd";
import { MainMenu } from "../components/main-menu";
import './style.scss';
import { IPageTitleContext, PageTitleContext } from "../common/contexts/pageTitle.context";
export const DashboardBase: FC = withAuthorized(() => {
    const { pageTitle } = useContext(PageTitleContext) as IPageTitleContext
    return (
        <Layout>
            <MainHeader />
            <Row className="main-view">
                <Col span={4}>
                    <MainMenu />
                </Col>
                <Col className="main-content" span={20}>
                    <h2 className="page-title">{pageTitle}</h2>
                    <Outlet />
                </Col>
            </Row>
        </Layout>
    )
})