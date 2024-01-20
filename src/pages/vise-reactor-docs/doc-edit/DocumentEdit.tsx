import { FC, useContext, useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { vrDocSlice } from "../../../features/vise-rector-docs/sclices/vise-rector-doc.slice";
import { useParams } from "react-router-dom";
import { VRdocFetchById } from "../../../features/vise-rector-docs/thunks";
import { DocumentForm } from "../../../features/vise-rector-docs/components/document-form";
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
            dispatch(VRdocFetchById(id))
            setPageTitle(t('edit_doc'))
        }
        else {
            setPageTitle(t('create_doc'))

        }
        return () => { dispatch(vrDocSlice.actions.emptyState()) }
    }, [])

    return (
        <div className="pages">
            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "edit", title: `${id ? t('edit_doc') : t('create_doc')}` }} />
                <div></div>
            </ContentHeader>
            <div className="pages__content">
                <DocumentForm />
            </div>
        </div>
    )
}