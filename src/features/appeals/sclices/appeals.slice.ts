import { createSlice } from "@reduxjs/toolkit";
import { IAppealsResponse } from "../models";
import { fetchAppeals } from "../thunks";
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

export const appealsSlice = createSlice({
    name: "appealsSlice",
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAppeals.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchAppeals.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchAppeals.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})