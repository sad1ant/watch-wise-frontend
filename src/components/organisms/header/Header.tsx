import React, {useEffect, useState} from 'react'
import {AppDispatch} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectAuth} from "../../../redux/slices/auth-slice";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../atoms/buttons/Button";
import Modal from "../modals/Modal";
import LoginForm from "../../molecules/forms/auth/LoginForm";
import RegisterForm from "../../molecules/forms/auth/RegisterForm";

const Header: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const { isAuth } = useSelector(selectAuth)
    const navigate = useNavigate()

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    useEffect(() => {
        if (isAuth) {
            setIsLoginOpen(false)
        }
    }, [isAuth])

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/')
    }

    return (
        <header className="bg-dark-purple flex items-center justify-between p-4 shadow-lg">
            <div className="flex items-center space-x-4">
                <h1 className="text-white text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>Watch Wise</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/movies" className="text-white no-underline hover:text-purple-400">Фильмы</Link></li>
                        <li><Link to="/series" className="text-white no-underline hover:text-purple-400">Сериалы</Link></li>
                        {isAuth && (
                            <>
                                <li><Link to='/my-diary' className="text-white no-underline hover:text-purple-400">Мой дневник</Link></li>
                                <li><Link to="/profile" className="text-white no-underline hover:text-purple-400">Профиль</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="flex space-x-4">
                {isAuth ? (
                    <Button onClick={handleLogout}>Выйти</Button>
                ) : (
                    <>
                        <Button onClick={() => setIsLoginOpen(true)}>Войти</Button>
                        <Button onClick={() => setIsRegisterOpen(true)}>Регистрация</Button>
                    </>
                )}
            </div>
            <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
                <LoginForm />
            </Modal>
            <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
                <RegisterForm />
            </Modal>
        </header>
    )
}

export default Header