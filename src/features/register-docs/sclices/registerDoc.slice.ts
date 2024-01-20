import { createSlice } from "@reduxjs/toolkit";
import { IDocuments } from "../models";
import { RegdocFetchById, onRegDocuments } from "../thunks";

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

export const registerDocSlice = createSlice({
    name: 'registerDocSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onRegDocuments.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onRegDocuments.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            data: null,
            error: null
        }));
        builder.addCase(onRegDocuments.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(RegdocFetchById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(RegdocFetchById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(RegdocFetchById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})