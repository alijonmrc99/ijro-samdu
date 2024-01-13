import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_DOCUMENTS } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IDocuments, IDocumentsSend } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onVRDocuments = createAsyncThunk('doc/action',
    async (payload: { route: string, values: IDocumentsSend }, { rejectWithValue }) => {
        console.log(payload);

        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchVRDocuments = createAsyncThunk('auth/fetchDocuments',
    async (payload: { route: string, params: any }, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IDocuments>>>(payload.route, payload.params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const VRdocFetchById = createAsyncThunk('auth/docFetchById',
    async (id: any, { rejectWithValue }) => {

        try {
            return await httpApi.get<IResponse<IDocuments>>(`${ENDPOINT_DOCUMENTS}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
