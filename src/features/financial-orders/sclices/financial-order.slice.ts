import { createSlice } from "@reduxjs/toolkit";
import { IFinancialOrders, IFinancialOrdersResponse } from "../models";
import { fetchFinancialOrderById, onFinancialOrder } from "../thunks";

interface InitialStateProps {
    data: IFinancialOrdersResponse | null
    error: any,
    response: IFinancialOrders | null,
    isLoading: boolean
};

const initialState: InitialStateProps = {
    data: null,
    error: null,
    response: null,
    isLoading: false,
}

export const financialOrderSlice = createSlice({
    name: 'financialOrderSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onFinancialOrder.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onFinancialOrder.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            error: null
        }));
        builder.addCase(onFinancialOrder.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(fetchFinancialOrderById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(fetchFinancialOrderById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(fetchFinancialOrderById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})