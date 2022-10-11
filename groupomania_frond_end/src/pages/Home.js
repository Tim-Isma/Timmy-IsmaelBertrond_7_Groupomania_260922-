import React from 'react';
import Header from '@/components/admin/Header';
import Nav from '@/components/admin/Nav';

const Home = () => {
    return (
        <div>
            <Header/>
            <div className='home'>
                <Nav/>
                <div className='home_title'>
                    <h1>Accueil Groupomania</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;