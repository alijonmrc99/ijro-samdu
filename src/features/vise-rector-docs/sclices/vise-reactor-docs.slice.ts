import { createSlice } from "@reduxjs/toolkit";
import { IDocuments } from "../models";
import { fetchVRDocuments } from "../thunks";
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

export const vrDocsSlice = createSlice({
    name: "documentsSlice",
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, data: null })
    },

    extraReducers: (builder) => {
        builder.addCase(fetchVRDocuments.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchVRDocuments.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchVRDocuments.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})