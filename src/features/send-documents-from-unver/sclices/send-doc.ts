import { createSlice } from "@reduxjs/toolkit";
import { ISendDoc, ISendDocResponse } from "../models";
import { FetchSendDocById, onSendDoc } from "../thunks";

interface InitialStateProps {
    data: ISendDocResponse | null
    error: any,
    response: ISendDoc | null,
    isLoading: boolean
};

const initialState: InitialStateProps = {
    data: null,
    error: null,
    response: null,
    isLoading: false,
}

export const sendDocSlice = createSlice({
    name: 'sendDocSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onSendDoc.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onSendDoc.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            error: null
        }));
        builder.addCase(onSendDoc.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(FetchSendDocById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(FetchSendDocById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(FetchSendDocById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})