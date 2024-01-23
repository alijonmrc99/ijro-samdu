import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models";
import { FetchUserById, onUsers } from "../thunks";

interface InitialStateProps {
    data: IUser | null
    error: any,
    isLoading: boolean
};

const initialState: InitialStateProps = {
    data: null,
    error: null,
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        emptyState: (state) => {
            return ({ ...state, data: null })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(onUsers.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(onUsers.fulfilled, (state) => ({
            ...state,
            isLoading: false,
            data: null,
            error: null
        }));
        builder.addCase(onUsers.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));


        builder.addCase(FetchUserById.pending, (state) => ({
            ...state,
            isLoading: true,
            data: null,
            error: null
        }));
        builder.addCase(FetchUserById.fulfilled, (state, { payload }) => ({
            ...state,
            isLoading: false,
            data: payload.data,
            error: null
        }));
        builder.addCase(FetchUserById.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error
        }));

    }
})