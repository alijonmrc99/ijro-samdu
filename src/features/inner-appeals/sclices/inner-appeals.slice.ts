import { createSlice } from "@reduxjs/toolkit";
import { IAppealsResponse } from "../models";
import { fetchInnerAppeals } from "../thunks";
import { IPageable } from "../../../common/models";

interface InitialStateProps {
    isLoading: boolean;
    data: IPageable<IAppealsResponse> | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    data: null,
    error: null,
}

export const innerAppealsSlice = createSlice({
    name: "innerAppealsSlice",
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchInnerAppeals.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchInnerAppeals.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchInnerAppeals.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})