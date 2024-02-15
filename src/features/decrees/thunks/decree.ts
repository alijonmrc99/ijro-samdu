import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_DECREE } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IDecreeResponse } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onDecrees = createAsyncThunk('executiveOrders/action',
    async (payload: { values: any, route: string }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchDecrees = createAsyncThunk('fetch/executiveOrders',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IDecreeResponse>>>(ENDPOINT_DECREE, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const fetchDecreeById = createAsyncThunk('executiveOrders/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IDecreeResponse>>(`${ENDPOINT_DECREE}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
