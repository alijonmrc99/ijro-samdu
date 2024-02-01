import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINT_BUS_TRIP } from '../endpoints';
import { HttpApi } from '../../../common/http';
import { IBusinessTrip } from '../models';
import { IResponse, IPageable } from '../../../common/models';
const httpApi = new HttpApi();
export const onTrips = createAsyncThunk('trip/action',
    async (payload: { route: string, values: IBusinessTrip }, { rejectWithValue }) => {
        try {
            return await httpApi.post(payload.route, payload.values)
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const fetchTrips = createAsyncThunk('trip/fetchTrips',
    async (params: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IPageable<IBusinessTrip>>>(ENDPOINT_BUS_TRIP, params)
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const FetchTripById = createAsyncThunk('trip/FetchById',
    async (id: any, { rejectWithValue }) => {
        try {
            return await httpApi.get<IResponse<IBusinessTrip>>(`${ENDPOINT_BUS_TRIP}/${id}`, {})
        } catch (error) {
            return rejectWithValue(error);
        }
    });
