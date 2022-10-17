import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Error from '@/_utils/Error'

const AuthRouter = () => {
    return (
        <Routes>
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='/sign-up' element={<SignUp/>} />

            <Route path='*' element={<Error/>} />
        </Routes>
    );
};

export default AuthRouter;