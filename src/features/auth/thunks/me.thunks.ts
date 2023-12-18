import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_AUTH_ME } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IMe } from '../models';


export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
    const httpApi = new HttpApi();
    console.log(httpApi);
    try {
        return await httpApi.get<{ data: IMe }>(ENDPOINT_AUTH_ME, {}).then((response) => response);
    } catch (error) {
        return rejectWithValue(error);
    }
});
