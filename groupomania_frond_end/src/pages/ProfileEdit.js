import React, { useEffect, useRef, useState} from 'react';
import { Link, useNavigate  } from 'react-router-dom';

import { userService } from '@/_services/user.service';

import Header from '@/components/header/Header';
import Follow from '@/components/profile/Follow';
import Nav from '@/components/header/Nav';
import Like from '@/components/profile/Like';

import './profileedit.css'

const ProfileEdit = () => {
    const [user, setUser] = useState({})
    // const [picture, setPicture] = useState({
    //     image_profile: 'https://img2.freepng.fr/20180319/aeq/kisspng-computer-icons-google-account-user-profile-iconfin-png-icons-download-profile-5ab0301e0d78f3.2971990915214960940552.jpg'
    // })
    const [picture, setPicture] = useState('')
    //const [imagee, setImagee] = useState('')

    const flag = useRef(false)
    let navigate = useNavigate()

    let pictureUser = user.profilePicture
    //const {image_profile} = picture

    /* Information utilisateur */
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

    
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onChangeFile = (e) => {
        console.log('ici')
        //setImagee(e.target.file[0])
        const reader = new FileReader()
        
        reader.onload = () => {
            if(reader.readyState === 2) {
                setPicture({image_profile: reader.result}) 
            }
            // ???
        }
        reader.readAsDataURL(e.target.files[0])

        setPicture({
            ...picture,
            [e.target.name]: e.target.files[0]
        })
        
    }

    /* Modification des données utilisateur */
    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        //formData.append("image_profile", imagee);
        formData.append("user", user);


        userService.updateUser(user._id, formData)
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
                    <form onSubmit={onSubmit} className='form-edit'>
                        <div className='profile-user'>
                            <div className='upload-img_container'>
                                <div>
                                    <h3 className='profil-title'>Photo de profile</h3>
                                    <div className='picture_container'>
                                        <img src={pictureUser} alt='User-profile-img'/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='profilePicture' className='update-img_btn'>Modifier votre photo
                                        <input
                                            type='file'
                                            id='profilePicture'
                                            name='image_profile'
                                            accept='.jpg, .jpeg, png'
                                            onChange={()=> onChangeFile}
                                            value={user.pictureProfile}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className='edit-user_container'>
                                <div>
                                    <label htmlFor='name' className='label_container'>Nom:
                                        <input className='name-field_profile'
                                            type='text' 
                                            name='name'
                                            value={user.name}
                                            onChange={() => onChange}
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
                                            onChange={() => onChange}
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
                                            onChange={() => onChange}
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
                                            onChange={() => onChange}
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
                                            onChange={() => onChange}
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
                                            onChange={() => onChange}
                                        />
                                    </label>
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

export default ProfileEdit;