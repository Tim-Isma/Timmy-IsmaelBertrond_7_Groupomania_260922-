import React, { useEffect, useRef, useState} from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import { userService } from '@/_services/user.service';

import Header from '@/components/header/Header';
import Follow from '@/components/profile/Follow';
import Nav from '@/components/header/Nav';
import Like from '@/components/profile/Like';

import './profileedit.css'

const Profile = () => {
    const [profil, setProfil] = useState([])
    const flag = useRef(false)
    let navigate = useNavigate()

    useEffect(() => {
        if(flag.current === false) {
            userService.getOneUser()
                .then(res => {
                    console.log(res.data)
                    setProfil(res.data)
                })       
                .catch(err => console.log(err))
        }

        return () => flag.current = true
    }, [])

    const onChange = (e) => {
        
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(profil)
        userService.updateUser(profil)
            .then(res => {
                console.log(res)
                navigate('/admin/profile')
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
                <section>
                    <Like/>
                    <Follow/>
                </section>
            </div>
            <section className='profile-container'>
                <div className='profile-user_container'>
                    <form onSubmit={onSubmit} className='form'>
                        <div className='profile-user'>
                            <div className='upload-img_container'>
                                <div>
                                    <h3>Photo de profile</h3>
                                    <div className='picture_container'>
                                        Photo
                                    </div>
                                </div>
                                <div>
                                <label htmlFor='profilePicture' className='update-img_btn'>Modifier votre photo</label>
                                <input className='file_upload'
                                    type='file'
                                    id='profilePicture'
                                    name='profilePicture'
                                    accept='.jpg, .jpeg, png'
                                />
                                </div>
                            </div>
                            <div className='edit-user_container'>
                                <div>
                                    <label htmlFor='name' className='label_container'>Nom:</label>
                                    <input className='name-field_profile'
                                        type='text' 
                                        name='name'
                                        value={profil.name}
                                        onChange={onChange}
                                    />
                                    <div className='message_error'></div>
                                </div>
                                <div>
                                    <label htmlFor='firstName' className='label_container'>Prénom:</label>
                                    <input className='firstName-field_profile'
                                        type='text' 
                                        name='firstName'
                                        value=''
                                        onChange={onChange}
                                    />
                                    <div className='message_error'></div>
                                </div>
                                <div>
                                    <label htmlFor='pseudo' className='label_container'>Pseudo</label>
                                    <input className='pseudo-field_profile'
                                        type='text' 
                                        name='pseudo'
                                        value=''
                                        onChange={onChange}
                                    />
                                    <div className='message_error'></div>
                                </div>
                                <div>
                                    <label htmlFor='email' className='label_container'>Email</label>
                                    <input className='email-field_profile'
                                        type='text' 
                                        name='email'
                                        value=''
                                        onChange={onChange}
                                    />
                                    <div className='message_error'></div>
                                </div>
                                <div>
                                    <label htmlFor='city' className='label_container'>Ville</label>
                                    <input className='city-field_profile'
                                        type='text' 
                                        name='city'
                                        value=''
                                        onChange={onChange}
                                    />
                                    <div className='message_error'></div>
                                </div>
                                <div>
                                    <label htmlFor='password' className='label_container'>Password</label>
                                    <input className='password-field_profile'
                                        type='text' 
                                        name='password'
                                        value=''
                                        onChange={onChange}
                                    />
                                    <div className='message_error'></div>
                                </div>
                                <div>
                                    <button className='submit-btn'>Valider votre profile</button>
                                </div> 
                            </div>
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

export default Profile;