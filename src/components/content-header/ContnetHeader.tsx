import React, { FC, useContext } from "react";
import { IPageTitleContext, PageTitleContext } from "../../common/contexts/pageTitle.context";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";
import './style.scss'
import { useTranslation } from "react-i18next";
interface IContentHeader {
    hasBackAction?: boolean,
    children: React.ReactNode
}
export const ContentHeader: FC<IContentHeader> = ({ hasBackAction, children }) => {
    const { pageTitle } = useContext(PageTitleContext) as IPageTitleContext;
    const { t } = useTranslation()
    const [breadcrumb, printBtn, pagination, actionBtn, sentButton] = React.Children.toArray(children)
    const navigate = useNavigate()

    return (
        <div className="content-header">
            <div>
                <Flex align="center">
                    {hasBackAction &&
                        <Button onClick={() => navigate(-1)} className="back-action"><LeftOutlined /> {t('back')}</Button>
                    }
                    <h2 className="content-title">{pageTitle}</h2>
                </Flex>
                <div className="">
                    {breadcrumb}
                </div>
            </div>

            <div className="new-doc">
                <Flex justify="end">
                    {sentButton}
                    {actionBtn}
                    {printBtn}
                </Flex>
                {pagination}
            </div>


        </div>
    )
}