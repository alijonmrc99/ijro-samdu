import { createSlice } from "@reduxjs/toolkit";
import { IMe } from "../models/IMe";
import { fetchMe } from "../thunks";

interface InitialStateProps {
    isLoading: boolean;
    data: IMe | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    data: null,
    error: null,
}

export const meSlice = createSlice({
    name: "me",
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, data: null })
    },

    extraReducers: (builder) => {
        builder.addCase(fetchMe.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));

        builder.addCase(fetchMe.fulfilled, (state, { payload: { data } }) => ({
            ...state,
            isLoading: false,
            data: data,
            error: null,
        }))

        builder.addCase(fetchMe.rejected, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: payload,
        }))
    }
})