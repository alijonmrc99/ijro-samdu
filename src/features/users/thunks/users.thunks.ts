import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_USERS } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IUser } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onUsers = createAsyncThunk('user/action',
    async (payload: { route: string, values: IUser }, { rejectWithValue }) => {
        console.log(payload);

        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchUsers = createAsyncThunk('auth/fetchUsers',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IUser>>>(ENDPOINT_USERS, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const FetchUserById = createAsyncThunk('auth/FetchUserById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IUser>>(`${ENDPOINT_USERS}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
