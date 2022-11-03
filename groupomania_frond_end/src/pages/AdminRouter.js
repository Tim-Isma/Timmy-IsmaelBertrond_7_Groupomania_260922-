import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import ProfileEdit from '@/pages/ProfileEdit';
import Error from '@/_utils/Error'


const AdminRouter = () => {
    return (
        <Routes>
            <Route index element={<Home/>} />

            <Route path='/home' element={<Home/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/profile/edit' element={<ProfileEdit/>} />
                
            <Route path='*' element={<Error/>} />
        </Routes>
    );
};

export default AdminRouter;