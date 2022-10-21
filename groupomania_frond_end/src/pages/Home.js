import React, { useEffect, useState } from 'react';
import Header from '@/components/header/Header';
import Nav from '@/components/header/Nav';
import Post from '@/components/home/Post';

import { postService } from '../_services/post.service';

import './home.css'


const Home = () => {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        postService.getAllPosts()
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
            })
            .catch(err => console.log(err))
    })

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
            <div className='post_container'>
                {
                    posts.map(post => {
                        <div className='post-all'>
                            {post.post}
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Home;