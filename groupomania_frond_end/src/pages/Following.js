import React, { useEffect, useState } from 'react';

import { userService } from '@/_services/user.service';

import Header from '@/components/header/Header';
import Nav from '@/components/header/Nav';

import './following.css'

const Following = () => {
    const [followings, setFollowings] = useState([])

    useEffect(() => {
        userService.getAllUsers()
            .then(res => { 
                console.log(res.data)
                setFollowings(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    console.log(followings.length)
    return (
        <div>
            <Header/>
            <Nav/>
            <h1>Vos Following</h1>
            <div className='following_container'>
                <div className='following_card'>
                    
                </div>
            </div>
        </div>
    );
};
/*
{
    followings.map(following => {
                         
    })
}
*/

export default Following;