import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_APPEAL } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IAppealsResponse } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onAppeals = createAsyncThunk('appeals/action',
    async (payload: { values: any, route: string }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchAppeals = createAsyncThunk('fetch/appeals',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IAppealsResponse>>>(ENDPOINT_APPEAL, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const fetchAppealById = createAsyncThunk('appeals/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IAppealsResponse>>(`${ENDPOINT_APPEAL}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
