import React, { FC, useContext } from "react";
import { IPageTitleContext, PageTitleContext } from "../../common/contexts/pageTitle.context";
import { FileAddOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

interface IContentHeader {
    hasBackAction?: boolean,
    children: React.ReactNode
}
export const ContentHeader: FC<IContentHeader> = ({ hasBackAction, children }) => {
    const { pageTitle } = useContext(PageTitleContext) as IPageTitleContext;
    const navigate = useNavigate()
    return (
        <div className="content-header">
            {hasBackAction ?
                <button onClick={() => navigate(-1)} className="back-action"><LeftOutlined /> <h2>{pageTitle}</h2></button>
                : <h2>{pageTitle}</h2>}
            <Button onClick={() => navigate('/dashboard/documents/create')} type="primary"> <FileAddOutlined />Hujjat yaratish</Button>

        </div>
    )
}