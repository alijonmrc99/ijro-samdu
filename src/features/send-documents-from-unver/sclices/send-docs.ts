import { createSlice } from "@reduxjs/toolkit";
import { ISendDocResponse } from "../models";
import { fetchSendDocs } from "../thunks";
import { IPageable } from "../../../common/models";

interface InitialStateProps {
    isLoading: boolean;
    data: IPageable<ISendDocResponse> | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    data: null,
    error: null,
}

export const sendDocsSlice = createSlice({
    name: "sendDocsSlice",
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSendDocs.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchSendDocs.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchSendDocs.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})