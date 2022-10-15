import React from 'react';
import Header from '@/components/admin/Header';
import Nav from '@/components/admin/Nav';
import Post from '@/components/admin/Post';


const Home = () => {
    return (
        <div>
            <Header/>
            <div className='home'>
                <Nav/>
                <div className='home_title'>
                    <h1>Bienvenue chez Groupomania</h1>
                </div>
            </div>
            <div className='home_post'>
                <Post/>
            </div>
        </div>
    );
};

export default Home;