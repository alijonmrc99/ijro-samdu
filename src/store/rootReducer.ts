import { combineReducers } from "@reduxjs/toolkit";
import { notificationSlice } from "../common/notification/slices";

export const rootReducer = combineReducers({
    notification: notificationSlice.reducer
})