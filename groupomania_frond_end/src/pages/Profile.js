import React from 'react';
import Header from '@/components/admin/Header';
import Follow from '@/components/admin/Follow';
import Nav from '@/components/admin/Nav';
import Like from '@/components/admin/Like';

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
        </div>
    );
};

export default Profile;