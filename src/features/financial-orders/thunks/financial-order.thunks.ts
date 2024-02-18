import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpApi } from '../../../common/http';
import { IFinancialOrdersResponse } from '../models';
import { IResponse, IPageable } from '../../../common/models';
import { ENDPOINT_FINANCIAL_ORDERS } from '../endpoints';
const httpApi = new HttpApi();
export const onFinancialOrder = createAsyncThunk('financialOrder/action',
    async (payload: { values: any, route: string }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchFinancialOrders = createAsyncThunk('fetch/financialOrders',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IFinancialOrdersResponse>>>(ENDPOINT_FINANCIAL_ORDERS, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const fetchFinancialOrderById = createAsyncThunk('financialOrder/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IFinancialOrdersResponse>>(`${ENDPOINT_FINANCIAL_ORDERS}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
