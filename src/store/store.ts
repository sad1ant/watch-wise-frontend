import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../redux/slices/auth-slice'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store