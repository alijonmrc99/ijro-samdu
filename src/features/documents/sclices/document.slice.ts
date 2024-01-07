import { createSlice } from "@reduxjs/toolkit";
import { IDocuments } from "../models";
import { docFetchById } from "../thunks";

interface InitialStateProps {
    data: IDocuments | null
    error: any,
    isLoading: boolean
};

const initialState: InitialStateProps = {
    data: null,
    error: null,
    isLoading: false,
}

export const documentSlice = createSlice({
    name: 'documentSlice',
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, data: null })
    },
    extraReducers: (builder) => {
        builder.addCase(docFetchById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(docFetchById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(docFetchById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})