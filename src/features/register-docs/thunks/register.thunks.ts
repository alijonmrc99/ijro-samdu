import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_INCOMING } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IDocuments, IDocumentsSend } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onRegDocuments = createAsyncThunk('doc/onRegDocuments',
    async (payload: { route: string, values: IDocumentsSend }, { rejectWithValue }) => {
        console.log(payload);

        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchRegDocuments = createAsyncThunk('auth/fetchRegDocuments',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IDocuments>>>(ENDPOINT_INCOMING, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const RegdocFetchById = createAsyncThunk('auth/RegdocFetchById',
    async (id: any, { rejectWithValue }) => {
        console.log(ENDPOINT_INCOMING);

        try {
            return await httpApi.get<IResponse<IDocuments>>(`${ENDPOINT_INCOMING}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
