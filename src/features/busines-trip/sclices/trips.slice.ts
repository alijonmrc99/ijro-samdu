import { createSlice } from "@reduxjs/toolkit";
import { IBusinessTripResponse } from "../models";
import { fetchTrips } from "../thunks";
import { IPageable } from "../../../common/models";

interface InitialStateProps {
    isLoading: boolean;
    data: IPageable<IBusinessTripResponse> | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    data: null,
    error: null,
}

export const tripsSlice = createSlice({
    name: "tripsSlice",
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTrips.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchTrips.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchTrips.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})