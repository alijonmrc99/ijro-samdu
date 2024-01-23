import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models";
import { fetchUsers } from "../thunks";
import { IPageable } from "../../../common/models";

interface InitialStateProps {
    isLoading: boolean;
    data: IPageable<IUser> | null;
    error: any;
}

const initialState: InitialStateProps = {
    isLoading: false,
    data: null,
    error: null,
}

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {
        emptyState: (state) => ({ ...state, data: null })
    },

    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => ({
            ...state,
            isLoading: true,
            error: null
        }));

        builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
            return ({
                ...state,
                isLoading: false,
                data: payload.data,
                error: null,
            })
        })

        builder.addCase(fetchUsers.rejected, (state, { error }) => ({
            ...state,
            isLoading: false,
            data: null,
            error: error,
        }))
    }
})