import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "../../api/api";
import {RootState} from "../../store/store";

interface SeriesState {
    series: any[] | null
    recommendations: any[] | null
    interested: any[] | null
    loading: boolean
    error: string | null
}

const initialState: SeriesState = {
    series: [],
    recommendations: [],
    interested: [],
    loading: false,
    error: null
}

export const fetchSeries = createAsyncThunk(
    'series/fetchSeries',
    async ({ page, size }: { page: number, size: number }, thunkAPI) => {
        try {
            const response = await api.get(`/series?page=${page}&size=${size}`)
            return response.data.content
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchFilteredSeries = createAsyncThunk(
    'series/fetchFilteredSeries',
    async ({ params, page, size }: { params: any, page: number, size: number }, thunkAPI) => {
        try {
            const response = await api.get('/series', { params: { ...params, page, size } })
            return response.data.content
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const searchSeries = createAsyncThunk(
    'series/searchSeries',
    async ({ title, page, size }: { title: string, page: number, size: number}, thunkAPI) => {
        try {
            const response = await api.post(`/series/search?page=${page}&size=${size}`, { title })
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchSeriesRecommendations = createAsyncThunk(
    'series/fetchSeriesRecommendations',
    async (token: string | null, thunkAPI) => {
        try {
            const response = await api.get('/series-recommendations', {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchInterestedSeries = createAsyncThunk(
    'series/fetchInterestedSeries',
    async (token: string | null, thunkAPI) => {
        try {
            const response = await api.get('/series-interested', {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const seriesSlice = createSlice({
    name: 'series',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSeries.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSeries.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.series = action.payload
            })
            .addCase(fetchSeries.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(fetchFilteredSeries.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilteredSeries.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.series = action.payload
            })
            .addCase(fetchFilteredSeries.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(searchSeries.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(searchSeries.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.series = action.payload
            })
            .addCase(searchSeries.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(fetchSeriesRecommendations.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSeriesRecommendations.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.recommendations = action.payload
            })
            .addCase(fetchSeriesRecommendations.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(fetchInterestedSeries.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchInterestedSeries.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.interested = action.payload
            })
            .addCase(fetchInterestedSeries.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export const selectSeries = (state: RootState) => state.series
export const selectSeriesRecommendations = (state: RootState) => state.series.recommendations
export const selectInterestedSeries = (state: RootState) => state.series.interested

export default seriesSlice.reducer