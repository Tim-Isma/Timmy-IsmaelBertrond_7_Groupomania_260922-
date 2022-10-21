import React, { useEffect, useState } from 'react';

import { userService } from '@/_services/user.service';

import './editprofile.css'

const EditProfile = () => {
 
    const [user, setUser] = useState([])
    const [btnForm, setBtnForm] = useState(false)

    useEffect(() => {
        userService.getOneUser()
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            })       
            .catch(err => console.log(err))
    }, [])
    
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const handleEdit = (e) => {
        e.preventDefault()
        console.log('Editing')
        setBtnForm(!btnForm)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log('Validation profile')
    }

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <div className='edit_container'>
                    <div className='upload-img_container'>
                        <div>
                            <h3>Photo de profile</h3>
                            <div className='picture_container'>
                                Photo
                            </div>
                        </div>
                        <div>
                            { btnForm ? (
                            <label htmlFor='profilePicture' className='update-img_btn'>Modifier votre photo</label>
                            ) : null}
                            <input className='file_upload'
                                type={btnForm ? 'file' : 'hidden'}
                                id='profilePicture'
                                name='profilePicture'
                                accept='.jpg, .jpeg, png'
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor='name'>Nom</label>
                            <input className='name-field_profile'
                                type='text' 
                                name='name'
                                value={user.name}
                                onChange={onChange} 
                            />
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='firstName'>Prénom</label>
                            <input className='firstName-field_profile'
                                type='text' 
                                name='firstName'
                                value={user.firstName}
                                onChange={onChange}
                            />
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='pseudo'>Pseudo</label>
                            <input className='pseudo-field_profile'
                                type='text' 
                                name='pseudo'
                                value={user.pseudo}
                                onChange={onChange}
                            />
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input className='email-field_profile'
                                type='text' 
                                name='email'
                                value={user.email}
                                onChange={onChange}
                            />
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='city'>Ville</label>
                            <input className='city-field_profile'
                                type='text' 
                                name='city'
                                value={user.city}
                                onChange={onChange}
                            />
                            <div className='message_error'></div>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input className='password-field_profile'
                                type='text' 
                                name='password'
                                value={user.password}
                                onChange={onChange}
                            />
                            <div className='message_error'></div>
                        </div>
                        <input className='submit-btn' 
                            type={btnForm ? 'submit' : 'hidden'} 
                            value='Valider votre profile' 
                        />
                    </div>
                </div>
            </form>
            
            <div className='edit_btn_container'>
                <button className='edit_btn' onClick={handleEdit}>
                    <i className="fas fa-user-edit"></i>
                </button>
            </div>
        </div>
    );
};

export default EditProfile;