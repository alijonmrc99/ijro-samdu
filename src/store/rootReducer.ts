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
import { letterSlice, lettersSlice } from "../features/mailed-letters/sclices";
import { executiveOrderSlice, executiveOrdersSlice } from "../features/executive-orders/sclices";
import { decreeSlice, decreesSlice } from "../features/decrees/sclices";
import { sendDocSlice, sendDocsSlice } from "../features/send-documents-from-unver/sclices";
import { appealSlice, appealsSlice } from "../features/appeals/sclices";
import { distributionSlice, distributionsSlice } from "../features/distributions/sclices";
import { innerAppealSlice, innerAppealsSlice } from "../features/inner-appeals/sclices";
import { financialOrderSlice, financialOrdersSlice } from "../features/financial-orders/sclices";

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
    letters: lettersSlice.reducer,
    letter: letterSlice.reducer,
    executiveOrders: executiveOrdersSlice.reducer,
    executiveOrder: executiveOrderSlice.reducer,
    decrees: decreesSlice.reducer,
    decree: decreeSlice.reducer,
    sendDocs: sendDocsSlice.reducer,
    sendDoc: sendDocSlice.reducer,
    appeal: appealSlice.reducer,
    appeals: appealsSlice.reducer,
    distribution: distributionSlice.reducer,
    distributions: distributionsSlice.reducer,
    innerAppeals: innerAppealsSlice.reducer,
    innerAppeal: innerAppealSlice.reducer,
    financialOrder: financialOrderSlice.reducer,
    financialOrders: financialOrdersSlice.reducer

})