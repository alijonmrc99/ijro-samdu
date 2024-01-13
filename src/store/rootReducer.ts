import { combineReducers } from "@reduxjs/toolkit";
import { notificationSlice } from "../common/notification/slices";
import { meSlice } from "../features/auth/sclices";
import { documentsSlice } from "../features/vise-rector-docs/sclices";
import { documentSlice } from "../features/vise-rector-docs/sclices/document.slice";

export const rootReducer = combineReducers({
    notification: notificationSlice.reducer,
    me: meSlice.reducer,
    documents: documentsSlice.reducer,
    document: documentSlice.reducer
})