import React from 'react';
import Header from '@/components/admin/Header';
import Follow from '@/components/admin/Follow';
import Nav from '@/components/admin/Nav';
import Like from '@/components/admin/Like';
import EditProfile from '../components/admin/EditProfile';

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