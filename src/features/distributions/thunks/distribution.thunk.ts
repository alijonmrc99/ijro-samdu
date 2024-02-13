import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_DISTRIBUTION } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IDistributionResponse } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onDistributions = createAsyncThunk('distribution/action',
    async (payload: { values: any, route: string }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchDistributions = createAsyncThunk('fetch/distribution',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IDistributionResponse>>>(ENDPOINT_DISTRIBUTION, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const fetchDistributionsById = createAsyncThunk('distribution/FetchById',
    async (id: any, { rejectWithValue }) => {
        console.log('dis');

        try {
            return await httpApi.get<IResponse<IDistributionResponse>>(`${ENDPOINT_DISTRIBUTION}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
