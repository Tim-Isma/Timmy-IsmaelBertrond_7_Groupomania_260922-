import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { userService } from '@/_services/user.service';

import Header from '@/components/header/Header';
import Nav from '@/components/header/Nav';

import './profile.css'

const Profile = () => {
    const [user, setUser] = useState([])

    const flag = useRef(false)
    let navigate = useNavigate()

    let pictureUser = user.profilePicture

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

    /* Suppression de l'utilisateur */
    const delUser = () => {
        console.log(user)
        userService.deleteUser(user)
            .then(res => {
                console.log(res)
                //setUser((current) => current.filter(user => user.id !== userId))
                navigate('/auth/sign-up')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Header/>
            <div className='profile_container'>
                <Nav/>
                <div className='profile_title'> 
                    <h1>Votre profile</h1>
                </div>
                <div className='delete-btn_container'>
                    <button className='delete-btn' onClick={() => delUser(user)}>
                        <i className="fa-solid fa-user-xmark"></i>
                    </button>
                </div>
            </div>
            <section className='profile-container'>
                <div className='profile-user_container'>
                    <div className='profile-user'>
                        <div className='upload-img_container'>
                            <div>
                                <h3 className='profil-title'>Photo de profile</h3>
                                <div className='picture_container'>
                                    <img src={pictureUser} alt='User-profile-img'/>
                                </div>
                            </div>
                        </div>
                        <div className='info-user_container'>
                            <ul>
                                <li className='description_list'>Nom:</li>
                                <li className='info-user_list'>{user.name}</li>
                                <li className='description_list'>Prénom:</li>
                                <li className='info-user_list'>{user.firstName}</li>
                                <li className='description_list'>Pseudo:</li>
                                <li className='info-user_list'>{user.pseudo}</li>
                                <li className='description_list'>Email:</li>
                                <li className='info-user_list'>{user.email}</li>
                                <li className='description_list'>Ville:</li>
                                <li className='info-user_list'>{user.city}</li>
                                <li className='description_list'>Password:</li>
                                <li className='info-user_list'>{user.password}</li>
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