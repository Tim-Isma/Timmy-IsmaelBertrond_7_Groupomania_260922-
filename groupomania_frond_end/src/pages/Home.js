import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header/Header';
import Nav from '@/components/header/Nav';
import Post from '@/components/home/Post';
import PostCard from '@/components/home/PostCard';

import { userService } from '@/_services/user.service';
import { postService } from '@/_services/post.service';

import './home.css'

const Home = () => {
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
 
    const flag = useRef(false)
    let navigate = useNavigate()
    
/******************** Récupération des informations de l'utilisateur ********************/

    useEffect(() => {
        if(flag.current === false) {
            userService.getOneUser()
                .then(res => {
                    //console.log(res.data)
                    setUser(res.data)
                })       
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

/******************** Suppression du compte utilisateur ********************/

    const delUser = () => {
        console.log(user)
        userService.deleteUser(user)
            .then(res => {
                //console.log(res)
                navigate('/auth/sign-up')
            })
            .catch(err => console.log(err))
    }

/******************** Affichage des Posts ************************/

    useEffect(() => {
        if(flag.current === false) {
            postService.getAllPosts()
                .then(res => {
                    //console.log(res.data)
                    setPosts(res.data)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])
    
    return (
        <div>
            <Header/>
            <div className='home_container'>
                <Nav/>
                <div className='home'>
                    <div className='home_title'>
                        <h1>Bienvenue {user.firstName}</h1>
                    </div>
                    <div className='delete-btn_container'>
                        <button className='delete-btn' onClick={() => delUser(user)}>
                            <i className="fa-solid fa-user-xmark"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className='home_post'>
                    <Post/>
                </div>
                <div className='post-wall_container'>
                    {
                        posts.map((post, index) => (
                            <PostCard post={post} user={user} key={index} manager={setPosts}/>
                        ))
                    }
                </div>
            </div>    
        </div>
    );
};

export default Home;