import React, { useEffect, useRef, useState} from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import { userService } from '@/_services/user.service';

import Header from '@/components/header/Header';
import Nav from '@/components/header/Nav';

import './profileedit.css'

const ProfileEdit = () => {
    const [user, setUser] = useState({})
    const [isLoading, setloading] = useState(true)

    const flag = useRef(false)
    let navigate = useNavigate()

/******************** Récupération des informations de l'utilisateur ********************/

    useEffect(() => {
        if(flag.current === false) {
            userService.getOneUser()
                .then(res => {
                    //console.log(res.data)
                    setUser(res.data)
                    setloading(false)
                })       
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

/******************** Modification des données Utilisateur  ************************/

    const onSubmit = (e) => {
        e.preventDefault()
        userService.updateUser(user)
            .then(res => {
                //console.log(res)
                navigate('/admin/profile')             
            })
            .catch(err => console.log(err))
    }


/******************** Suppression du compte utilisateur ********************/

    const delUser = () => {
        console.log(user)
        userService.deleteUser(user)
            .then(res => {
                console.log(res)
                navigate('/auth/sign-up')
            })
            .catch(err => console.log(err))
    }
    
    
    if(isLoading){
        return  <div>Loading...</div>
    }

    return (
    
        <div>
            <Header/>
            <div className='profile_container'>
                <Nav/>
                <div className='profile'>
                    <div className='profile_title'> 
                        <h1>Votre profile</h1>
                    </div>
                    <div className='delete-btn_container'>
                        <button className='delete-btn' onClick={() => delUser(user)}>
                            <i className="fa-solid fa-user-xmark"></i>
                        </button>
                    </div>
                </div>
            </div>
            <section className='profile_section'>
                <div className='profile-user_container'>
                    <form onSubmit={onSubmit} className='form-edit'>
                        <div>
                            <label htmlFor='name' className='label_container'>Nom:
                                <input className='name-field_profile'
                                    type='text' 
                                    name='name'
                                    value={user.name}
                                    onChange={onChange}
                                />
                            </label>
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='firstName' className='label_container'>Prénom:
                                <input className='firstName-field_profile'
                                    type='text' 
                                    name='firstName'
                                    value={user.firstName}
                                    onChange={onChange}
                                />
                            </label>
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='pseudo' className='label_container'>Pseudo:
                                <input className='pseudo-field_profile'
                                    type='text' 
                                    name='pseudo'
                                    value={user.pseudo}
                                    onChange={onChange}
                                />
                            </label>
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='email' className='label_container'>Email:
                                <input className='email-field_profile'
                                    type='text' 
                                    name='email'
                                    value={user.email}
                                    onChange={onChange}
                                />
                            </label>
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='city' className='label_container'>Ville:
                                <input className='city-field_profile'
                                    type='text' 
                                    name='city'
                                    value={user.city}
                                    onChange={onChange}
                                />
                            </label>
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='password' className='label_container'>Password:
                                <input className='password-field_profile'
                                    type='text' 
                                    name='password'
                                    value={user.password}
                                    onChange={onChange}
                                />
                            </label>
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <button className='submit-btn'>Valider votre profile</button>
                        </div> 
                    </form>
                    <div className='edit-btn_container'>
                        <Link to='/admin/profile'>
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

export default ProfileEdit;