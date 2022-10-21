import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/_services/user.service';

import Header from '@/components/header/Header';
import Follow from '@/components/profile/Follow';
import Nav from '@/components/header/Nav';
import Like from '@/components/profile/Like';

import './profile.css'

const Profile = () => {
    const [user, setUser] = useState([])
    const flag = useRef(false)

    useEffect(() => {
        if(flag.current === false) {
            userService.getOneUser()
                .then(res => {
                    console.log(res.data)
                    setUser(res.data)
                })       
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    return (
        <div>
            <Header/>
            <div className='profile_container'>
                <Nav/>
                <div className='profile_title'> 
                    <h1>Votre profile</h1>
                </div>
                <section>
                    <Like/>
                    <Follow/>
                </section>
            </div>
            <section className='profile-container'>
                <div className='profile-user_container'>
                    <div className='profile-user'>
                        <div className='upload-img_container'>
                            <div>
                                <h3>Photo de profile</h3>
                                <div className='picture_container'>
                                    Photo
                                </div>
                            </div>
                        </div>
                        <div className='info-user_container'>
                            <ul>
                                <li>Nom:</li>
                                <li className='info-user_list'>{user.name}</li>
                                <li>Prénom:</li>
                                <li className='info-user_list'>{user.firstName}</li>
                                <li>Pseudo:</li>
                                <li className='info-user_list'>{user.pseudo}</li>
                                <li>Email:</li>
                                <li className='info-user_list'>{user.email}</li>
                                <li>Ville:</li>
                                <li className='info-user_list'>{user.city}</li>
                                <li>Mot de passe:</li>
                                <li className='info-user_list'>**********</li>
                            </ul>
                        </div>
                    </div>
                    <div className='edit-btn_container'>
                        <Link to='/admin/profile/edit'>
                            <button className='edit-btn'>
                                    <i className="fas fa-user-edit"></i>
                            </button>
                        </Link>
                    </div>
                </div>  
            </section>
        </div>
    );
};

export default Profile;