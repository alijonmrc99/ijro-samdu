import { createSlice } from "@reduxjs/toolkit";
interface InitialStateProps {
    is_open: boolean,
    message: string
};

const initialState: InitialStateProps = {
    is_open: false,
    message: ""
}
export const notificationSlice = createSlice({
    name: "notificationSlice",
    initialState,
    reducers: {
        open: (state, data) => {
            return { ...state, is_open: true, message: data.payload.message }
        },
        close: (state) => {
            return { ...state, is_open: false }
        }
    }
})