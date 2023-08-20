import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../wrappers/WithGuest';
import { UserService } from '../services/user.service';
import { REACT_APP_BASE_URL } from "../../env";

export const SignUp = withGuest(() => {
    const nav = useNavigate();

    const userService = new UserService(REACT_APP_BASE_URL!);

    const handleSubmit = async (user: any) => {
        user.provider = 'local';
        user.emailVerified = false;
        user.isPrivate = false;

        try {
            const res = await userService.registerUser(user);

            if (res.status === 201) {
                nav('/signin');
            } else {
                console.error('Hubo un error en el registro');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return <><h1>SignUp</h1></>;
});