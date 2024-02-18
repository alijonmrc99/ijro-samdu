import { createSlice } from "@reduxjs/toolkit";
import { IFinancialOrdersResponse } from "../models";
import { fetchFinancialOrders } from "../thunks";
import { IPageable } from "../../../common/models";

interface InitialStateProps {
    isLoading: boolean;
    data: IPageable<IFinancialOrdersResponse> | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    data: null,
    error: null,
}

export const financialOrdersSlice = createSlice({
    name: "financialOrdersSlice",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchFinancialOrders.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchFinancialOrders.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchFinancialOrders.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})