import { createSlice } from "@reduxjs/toolkit";
import { IDocuments } from "../models";
import { fetchDocuments } from "../thunks";
import { IPageable } from "../../../common/models";

interface InitialStateProps {
    isLoading: boolean;
    data: IPageable<IDocuments> | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    data: null,
    error: null,
}

export const documentsSlice = createSlice({
    name: "documentsSlice",
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, data: null })
    },

    extraReducers: (builder) => {
        builder.addCase(fetchDocuments.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchDocuments.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchDocuments.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})