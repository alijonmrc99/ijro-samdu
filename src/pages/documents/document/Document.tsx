import { FC, useContext, useEffect } from "react";
import { docFetchById } from "../../../features/documents/thunks";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { DocumentView } from "../../../components/documnet-view";
import { Spin } from "antd";
import { documentSlice } from "../../../features/documents/sclices/document.slice";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";

const sytle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh"
}

export const Document: FC = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext

    const { data, isLoading } = useAppSelector(state => state.document)

    useEffect(() => {
        setPageTitle(data?.title || "");
        console.log(data?.title);

    }, [data])

    useEffect(() => {
        dispatch(docFetchById(id))
        return () => { dispatch(documentSlice.actions.emptyState()) }
    }, [])

    return (
        <div className="pages">
            <ContentHeader hasBackAction={true}>
                ss
            </ContentHeader>
            <div className="pages__content" style={sytle}>
                {
                    isLoading ? <Spin tip="loading" /> :
                        <DocumentView status={data?.status || null} contentText={data?.body || ""} />
                }
            </div>
        </div>
    )
}