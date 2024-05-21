import React, {useEffect} from 'react';
import { useDispatch } from "react-redux"
import {checkAuth} from "./utils/checkAuth";
import AppRouter from "./route/AppRouter";
import {AppDispatch} from "./store/store";
import Header from "./components/organisms/header/Header";
import Footer from "./components/organisms/footer/Footer";
import {BrowserRouter} from "react-router-dom";

function App() {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            checkAuth(dispatch)
        }
    }, [dispatch]);

  return (
      <BrowserRouter>
        <Header />
          <AppRouter />
          <Footer />
      </BrowserRouter>

  );
}

export default App;
