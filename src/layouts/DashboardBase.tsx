import { FC, useContext } from "react";
import { withAuthorized } from "../features/auth/hocs";
import { Outlet, useNavigate } from "react-router-dom";
import { MainHeader } from "../components/main-header";
import { Button, Col, Flex, Layout, Row } from "antd";
import { MainMenu } from "../components/main-menu";
import './style.scss';
import { IPageTitleContext, PageTitleContext } from "../common/contexts/pageTitle.context";
import { FileAddOutlined } from "@ant-design/icons";
export const DashboardBase: FC = withAuthorized(() => {
    const navigate = useNavigate();
    const { pageTitle } = useContext(PageTitleContext) as IPageTitleContext
    return (
        <Layout>
            <MainHeader />
            <Row className="main-view">
                <Col span={4}>
                    <MainMenu />
                </Col>
                <Col className="main-content" span={20}>
                    {/* <Flex justify="space-between">
                        <h2 className="page-title">{pageTitle}</h2>
                        </Flex> */}
                    <Outlet />
                </Col>
            </Row>
        </Layout>
    )
})