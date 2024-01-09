import React, { FC, useContext } from "react";
import { IPageTitleContext, PageTitleContext } from "../../common/contexts/pageTitle.context";
import { FileAddOutlined, LeftOutlined, PrinterOutlined } from "@ant-design/icons";
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
    const [breadcrumb, printBtn, pagination] = React.Children.toArray(children)
    const navigate = useNavigate()

    const printPage = () => {
        window.print()
    }
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

                {hasBackAction && <Button className="print" onClick={printPage} > <PrinterOutlined />{t('print')}</Button>}
                <Button onClick={() => navigate('/dashboard/documents/create')} type="primary"> <FileAddOutlined />{t('create_doc')}</Button>
            </div>


        </div>
    )
}