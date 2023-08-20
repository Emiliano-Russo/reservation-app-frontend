import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../wrappers/WithGuest';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { AuthService } from '../services/auth.service';
import { message } from 'antd';
import { REACT_APP_BASE_URL } from "../../env";

export const SignIn = withGuest(() => {
    const nav = useNavigate();
    const myUser = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const authService = new AuthService(REACT_APP_BASE_URL!);

    useEffect(() => {
        if (myUser) {
            nav('/home');
        }
    }, [myUser, nav]);

    const handleGoogleSuccess = async (response: any) => {
        authService
            .googleLogin(response.credential)
            .then(data => {
                const jwtToken = data.access_token;
                const user = data.user;
                localStorage.setItem('jwtToken', jwtToken);
                dispatch(addUser(user));
            })
            .catch(err => {
                message.error('Error');
            });
    };

    const handleLocalLogin = async (user: any) => {
        authService
            .login(user)
            .then(data => {
                const jwtToken = data.access_token;
                const user = data.user;
                localStorage.setItem('jwtToken', jwtToken);
                dispatch(addUser(user));
            })
            .catch(err => {
                message.error('Error');
            });
    };

    const handleGoogleError = () => { };

    return <><h1>Login</h1></>;
});