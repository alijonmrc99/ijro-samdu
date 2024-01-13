import { createSlice } from "@reduxjs/toolkit";
import { IDocuments } from "../models";
import { docFetchById, onDocuments } from "../thunks";

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
        emptyState: (state) => {
            console.log(1);
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onDocuments.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onDocuments.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            data: null,
            error: null
        }));
        builder.addCase(onDocuments.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


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