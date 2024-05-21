import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api";
import Cookies from "js-cookie";
import {RootState} from "../../store/store";

interface AuthState {
    user: any | null
    isAuth: boolean
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isAuth: false,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { username: string, password: string }, thunkAPI) => {
        try {
            const response = await api.post('/login', credentials)
            localStorage.setItem('access_token', response.data.access_token)
            const user = response.data.user
            return { user }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user: { username: string, email: string, password: string, fullName: string }, thunkAPI) => {
        try {
            const response = await api.post('/register', user)
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
    try {
        await api.post('/auth/logout')
        localStorage.removeItem('access_token')
        Cookies.remove('refresh_token')
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user
            state.isAuth = action.payload.isAuth
            state.loading = action.payload.loading
            state.error = action.payload.error
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.isAuth = true
                state.user = action.payload.user
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuth = false
                state.user = null
            })
    }
})

export const { setAuthState } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer