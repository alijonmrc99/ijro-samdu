import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_EXECUTIVE_ORDERS } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IExecutiveOrdersResponse } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onExecutiveOrders = createAsyncThunk('executiveOrders/action',
    async (payload: { values: any, route: string }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchExecutiveOrders = createAsyncThunk('fetch/executiveOrders',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IExecutiveOrdersResponse>>>(ENDPOINT_EXECUTIVE_ORDERS, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const FetchExecutiveOrderById = createAsyncThunk('executiveOrders/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IExecutiveOrdersResponse>>(`${ENDPOINT_EXECUTIVE_ORDERS}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
