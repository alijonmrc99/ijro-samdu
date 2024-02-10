import { createSlice } from "@reduxjs/toolkit";
import { IExecutiveOrders, IExecutiveOrdersResponse } from "../models";
import { FetchExecutiveOrderById, onExecutiveOrders } from "../thunks";

interface InitialStateProps {
    data: IExecutiveOrdersResponse | null
    error: any,
    response: IExecutiveOrders | null,
    isLoading: boolean
};

const initialState: InitialStateProps = {
    data: null,
    error: null,
    response: null,
    isLoading: false,
}

export const executiveOrderSlice = createSlice({
    name: 'executiveOrderSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onExecutiveOrders.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onExecutiveOrders.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            error: null
        }));
        builder.addCase(onExecutiveOrders.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(FetchExecutiveOrderById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(FetchExecutiveOrderById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(FetchExecutiveOrderById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})