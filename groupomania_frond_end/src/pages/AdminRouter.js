import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import ProfileEdit from '@/pages/ProfileEdit';
import Error from '@/_utils/Error'
import Follower from '@/pages/Follower';
import Following from '@/pages/Following';
//import ALayout from '@/pages/ALayout';


const AdminRouter = () => {
    return (
        <Routes>
                <Route index element={<Home/>} />

                <Route path='/home' element={<Home/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/profile/edit' element={<ProfileEdit/>} />
               

                <Route path='/follower' element={<Follower/>} />
                <Route path='/following' element={<Following/>} />
                
                <Route path='*' element={<Error/>} />
        </Routes>
    );
};

//<Route element={<ALayout/>}></Route> // ?????

export default AdminRouter;