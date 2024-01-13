import { combineReducers } from "@reduxjs/toolkit";
import { notificationSlice } from "../common/notification/slices";
import { meSlice } from "../features/auth/sclices";
import { vrDocsSlice } from "../features/vise-rector-docs/sclices";
import { vrDocSlice } from "../features/vise-rector-docs/sclices/vise-rector-doc.slice";
import { registerDocsSlice } from "../features/register-docs/sclices";
import { registerDocSlice } from "../features/register-docs/sclices/registerDoc.slice";

export const rootReducer = combineReducers({
    notification: notificationSlice.reducer,
    me: meSlice.reducer,
    vrDocs: vrDocsSlice.reducer,
    vrDoc: vrDocSlice.reducer,
    registerDoc: registerDocSlice.reducer,
    registerDocs: registerDocsSlice.reducer,
})