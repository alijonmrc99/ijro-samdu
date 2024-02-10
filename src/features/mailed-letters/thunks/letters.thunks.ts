import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_MAILED_LETTERS } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IMailledLettersResponse, IMailledLetters } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onLetters = createAsyncThunk('trip/action',
    async (payload: { route: string, values: IMailledLetters }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchLetters = createAsyncThunk('trip/fetchTrips',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IMailledLettersResponse>>>(ENDPOINT_MAILED_LETTERS, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const fetchLetterById = createAsyncThunk('trip/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IMailledLettersResponse>>(`${ENDPOINT_MAILED_LETTERS}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
