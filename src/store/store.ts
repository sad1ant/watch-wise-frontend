import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../redux/slices/auth-slice'
import moviesReducer from '../redux/slices/movie-slice'
import seriesReducer from '../redux/slices/series-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
        series: seriesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store