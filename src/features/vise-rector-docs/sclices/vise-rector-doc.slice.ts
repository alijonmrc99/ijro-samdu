import { createSlice } from "@reduxjs/toolkit";
import { IDocuments } from "../models";
import { VRdocFetchById, onVRDocuments } from "../thunks";

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

export const vrDocSlice = createSlice({
    name: 'documentSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onVRDocuments.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onVRDocuments.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            data: null,
            error: null
        }));
        builder.addCase(onVRDocuments.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(VRdocFetchById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(VRdocFetchById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(VRdocFetchById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})