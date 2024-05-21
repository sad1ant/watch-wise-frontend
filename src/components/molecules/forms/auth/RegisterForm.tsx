import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../../redux/slices/auth-slice";
import {AppDispatch} from "../../../../store/store";
import {useNavigate} from "react-router-dom";
import Input from "../../../atoms/inputs/Input";
import Button from "../../../atoms/buttons/Button";

const RegisterForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        fullName: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCredentials((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullName || !credentials.email) {
            setError('Пожалуйста, заполните все поля');
            return;
        }
        try {
            await dispatch(loginUser(credentials))
            navigate('/')
        } catch (error: any) {
            setError(error.message || 'Произошла ошибка при входе')
        }
    }

    return (
        <div>
            <h2 className="text-white text-2xl mb-4">Регистрация</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="text-white">Имя пользователя</label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Введите имя пользователя"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-white">Электронная почта</label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Введите эл. почту"
                    />
                </div>
                <div>
                    <label htmlFor="fullName" className="text-white">ФИО</label>
                    <Input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={credentials.fullName}
                        onChange={handleChange}
                        placeholder="Введите ФИО"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-white">Пароль</label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Введите пароль"
                    />
                </div>
                <Button type="submit" className="mt-4 w-full">Войти</Button>
            </form>
        </div>
    );
}

export default RegisterForm