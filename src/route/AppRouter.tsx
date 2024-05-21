import React from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Home from "../components/pages/Home";
import {useSelector} from "react-redux";
import {selectAuth} from "../redux/slices/auth-slice";

const AppRouter: React.FC = () => {
    const { isAuth } = useSelector(selectAuth)
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default AppRouter