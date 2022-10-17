import React from 'react';
import Header from '@/components/header/Header';
import Follow from '@/components/profile/Follow';
import Nav from '@/components/header/Nav';
import Like from '@/components/profile/Like';
import EditProfile from '../components/profile/EditProfile';

import './profile.css'

const Profile = () => {
    return (
        <div>
            <Header/>
            <div className='profile'>
                <Nav/>
                <div className='profile_title'> 
                    <h1>Votre profile</h1>
                </div>
                <section>
                    <Follow/>
                    <Like/>
                </section>
            </div>
            <section className='edit_profile'>
                <div className='form_profile'>
                    <EditProfile/>
                </div>
            </section>
        </div>
    );
};

export default Profile;