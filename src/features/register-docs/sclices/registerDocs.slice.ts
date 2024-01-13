import { createSlice } from "@reduxjs/toolkit";
import { IDocuments } from "../models";
import { fetchRegDocuments } from "../thunks";
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

export const registerDocsSlice = createSlice({
    name: "registerDocsSlice",
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, data: null })
    },

    extraReducers: (builder) => {
        builder.addCase(fetchRegDocuments.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchRegDocuments.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchRegDocuments.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})