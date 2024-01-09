import { FC, useContext, useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { documentSlice } from "../../../features/documents/sclices/document.slice";
import { useParams } from "react-router-dom";
import { docFetchById } from "../../../features/documents/thunks";
import { DocumentForm } from "../../../features/documents/components/document-form";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { useTranslation } from "react-i18next";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";

export const DocumentEdit: FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    useEffect(() => {
        if (id) {
            dispatch(docFetchById(id))
        }
        
        setPageTitle(t('create_doc'))
        return () => { dispatch(documentSlice.actions.emptyState()) }
    }, [])

    console.log(id);


    return (
        <div className="pages">
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{key: "edit", title: `${t('create_doc')}`}} />
            </ContentHeader>
            <div className="pages__content">
                <DocumentForm />
            </div>
        </div>
    )
}