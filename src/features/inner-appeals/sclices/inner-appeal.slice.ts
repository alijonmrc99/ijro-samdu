import { createSlice } from "@reduxjs/toolkit";
import { IAppeals, IAppealsResponse } from "../models";
import { fetchInnerAppealById, onInnerAppeals } from "../thunks";

interface InitialStateProps {
    data: IAppealsResponse | null
    error: any,
    response: IAppeals | null,
    isLoading: boolean
};

const initialState: InitialStateProps = {
    data: null,
    error: null,
    response: null,
    isLoading: false,
}

export const innerAppealSlice = createSlice({
    name: 'innerAppealSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onInnerAppeals.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onInnerAppeals.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            error: null
        }));
        builder.addCase(onInnerAppeals.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(fetchInnerAppealById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(fetchInnerAppealById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(fetchInnerAppealById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})