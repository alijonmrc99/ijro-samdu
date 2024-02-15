import { createSlice } from "@reduxjs/toolkit";
import { IAppeals, IAppealsResponse } from "../models";
import { fetchAppealById, onAppeals } from "../thunks";

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

export const appealSlice = createSlice({
    name: 'appealSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onAppeals.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onAppeals.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            error: null
        }));
        builder.addCase(onAppeals.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(fetchAppealById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(fetchAppealById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(fetchAppealById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})