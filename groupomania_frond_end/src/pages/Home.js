import React from 'react';
import Header from '@/components/header/Header';
import Nav from '@/components/header/Nav';
import Post from '@/components/home/Post';

import './home.css'

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