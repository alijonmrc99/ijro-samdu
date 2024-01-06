import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_DOCUMENTS } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IDocuments } from '../models';
import { IResponse, IPageable } from '../../../common/models';


export const fetchDocuments = createAsyncThunk('auth/fetchDocuments',
    async (params: any, { rejectWithValue }) => {
        const httpApi = new HttpApi();
        try {
            return await httpApi.get<IResponse<IPageable<IDocuments>>>(ENDPOINT_DOCUMENTS, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });
