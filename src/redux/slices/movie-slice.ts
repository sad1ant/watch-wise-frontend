import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "../../api/api";
import {RootState} from "../../store/store";

interface MoviesState {
    movies: any[] | null
    recommendations: any[] | null;
    interested: any[] | null;
    loading: boolean
    error: string | null
}

const initialState: MoviesState = {
    movies: [],
    recommendations: [],
    interested: [],
    loading: false,
    error: null
}

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async ({ page, size }: { page: number, size: number }, thunkAPI) => {
        try {
            const response = await api.get(`/movies?page=${page}&size=${size}`)
            return response.data.content
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchFilteredMovies = createAsyncThunk(
    'movies/fetchFilteredMovies',
    async ({ params, page, size }: { params: any, page: number, size: number }, thunkAPI) => {
        try {
            const response = await api.get('/movies', { params: { ...params, page, size } })
            return response.data.content
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async ({ title, page, size }: { title: string, page: number, size: number}, thunkAPI) => {
        try {
            const response = await api.post(`/movies/search?page=${page}&size=${size}`, { title })
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchMovieRecommendations = createAsyncThunk(
    'movies/fetchMovieRecommendations',
    async (token: string | null, thunkAPI) => {
        try {
            const response = await api.get('/movies-recommendations', {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchInterestedMovies = createAsyncThunk(
    'movies/fetchInterestedMovies',
    async (token: string | null, thunkAPI) => {
        try {
            const response = await api.get('/movies-interested', {
                headers: { Authorization: `Bearer ${token}` }
            })
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.movies = action.payload
            })
            .addCase(fetchMovies.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(fetchFilteredMovies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilteredMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.movies = action.payload
            })
            .addCase(fetchFilteredMovies.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(searchMovies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(searchMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.movies = action.payload
            })
            .addCase(searchMovies.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(fetchMovieRecommendations.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMovieRecommendations.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.recommendations = action.payload
            })
            .addCase(fetchMovieRecommendations.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(fetchInterestedMovies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchInterestedMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.loading = false
                state.interested = action.payload
            })
            .addCase(fetchInterestedMovies.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export const selectMovies = (state: RootState) => state.movies
export const selectMovieRecommendations = (state: RootState) => state.movies.recommendations
export const selectInterestedMovies = (state: RootState) => state.movies.interested

export default movieSlice.reducer