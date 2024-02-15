import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_SEND_DOCS_FROM_UNVER } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { ISendDocResponse } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onSendDoc = createAsyncThunk('sendDoc/action',
    async (payload: { values: any, route: string }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchSendDocs = createAsyncThunk('fetch/sendDoc',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<ISendDocResponse>>>(ENDPOINT_SEND_DOCS_FROM_UNVER, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const FetchSendDocById = createAsyncThunk('sendDoc/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<ISendDocResponse>>(`${ENDPOINT_SEND_DOCS_FROM_UNVER}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
