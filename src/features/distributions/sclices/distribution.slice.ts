import { createSlice } from "@reduxjs/toolkit";
import { IDistribution, IDistributionResponse } from "../models";
import { fetchDistributionsById, onDistributions } from "../thunks";

interface InitialStateProps {
    data: IDistributionResponse | null
    error: any,
    response: IDistribution | null,
    isLoading: boolean
};

const initialState: InitialStateProps = {
    data: null,
    error: null,
    response: null,
    isLoading: false,
}

export const distributionSlice = createSlice({
    name: 'distributionSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onDistributions.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onDistributions.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            error: null
        }));
        builder.addCase(onDistributions.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(fetchDistributionsById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(fetchDistributionsById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(fetchDistributionsById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})