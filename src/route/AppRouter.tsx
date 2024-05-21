import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../components/pages/Home";
import {useSelector} from "react-redux";
import {selectAuth} from "../redux/slices/auth-slice";
import Movies from "../components/pages/Movies";
import Series from "../components/pages/Series";

const AppRouter: React.FC = () => {
    const { isAuth } = useSelector(selectAuth)
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
        </Routes>
    )
}

export default AppRouter