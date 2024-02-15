import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_INNER_APPEAL } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IAppealsResponse } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onInnerAppeals = createAsyncThunk('inner-appeals/action',
    async (payload: { values: any, route: string }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchInnerAppeals = createAsyncThunk('fetch/inner-appeals',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IAppealsResponse>>>(ENDPOINT_INNER_APPEAL, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const fetchInnerAppealById = createAsyncThunk('inner-appeals/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IAppealsResponse>>(`${ENDPOINT_INNER_APPEAL}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
