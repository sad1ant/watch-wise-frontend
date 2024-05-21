import React, {useEffect} from 'react';
import { useDispatch } from "react-redux"
import {checkAuth} from "./utils/checkAuth";
import AppRouter from "./route/AppRouter";
import {AppDispatch} from "./store/store";

function App() {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            checkAuth(dispatch)
        }
    }, [dispatch]);

  return (
      <AppRouter />
  );
}

export default App;
