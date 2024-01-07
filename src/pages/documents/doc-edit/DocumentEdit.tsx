import { FC, useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { documentSlice } from "../../../features/documents/sclices/document.slice";
import { useParams } from "react-router-dom";
import { docFetchById } from "../../../features/documents/thunks";
import { DocumentForm } from "../../../features/documents/components/document-form";

export const DocumentEdit: FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(docFetchById(id))
        return () => { dispatch(documentSlice.actions.emptyState()) }
    }, [])

    return (
        <>
            <DocumentForm />
        </>
    )
}