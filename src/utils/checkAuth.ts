import axios from "axios";
import { API_URL } from "../api/api";
import { setAuthState } from "../redux/slices/auth-slice";
import { AppDispatch } from "../store/store";

interface AuthResponse {
    tokens: {
        access_token: string,
        refresh_token: string
    };
    user: any;
}

export const checkAuth = async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
        const { tokens, user } = response.data;
        const access_token = tokens.access_token;

        if (access_token) {
            localStorage.setItem('access_token', access_token);

            dispatch(setAuthState({
                user,
                isAuth: true,
                loading: false,
                error: null
            }));
        } else {
            dispatch(setAuthState({
                user: null,
                isAuth: false,
                loading: false,
                error: 'No access token found'
            }));
        }

        return response;
    } catch (error: any) {
        console.error(error.response?.data?.message);

        dispatch(setAuthState({
            user: null,
            isAuth: false,
            loading: false,
            error: error.response?.data?.message || 'Authentication failed'
        }));

        return null;
    }
};