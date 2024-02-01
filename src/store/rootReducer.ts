import { combineReducers } from "@reduxjs/toolkit";
import { notificationSlice } from "../common/notification/slices";
import { meSlice } from "../features/auth/sclices";
import { vrDocsSlice } from "../features/vise-rector-docs/sclices";
import { vrDocSlice } from "../features/vise-rector-docs/sclices/vise-rector-doc.slice";
import { registerDocsSlice } from "../features/register-docs/sclices";
import { registerDocSlice } from "../features/register-docs/sclices/registerDoc.slice";
import { usersSlice } from "../features/users/sclices";
import { userSlice } from "../features/users/sclices/user.slice";
import { tripsSlice } from "../features/busines-trip/sclices";
import { tripSlice } from "../features/busines-trip/sclices";

export const rootReducer = combineReducers({
    notification: notificationSlice.reducer,
    me: meSlice.reducer,
    vrDocs: vrDocsSlice.reducer,
    vrDoc: vrDocSlice.reducer,
    registerDoc: registerDocSlice.reducer,
    registerDocs: registerDocsSlice.reducer,
    users: usersSlice.reducer,
    user: userSlice.reducer,
    trips: tripsSlice.reducer,
    trip: tripSlice.reducer,
})