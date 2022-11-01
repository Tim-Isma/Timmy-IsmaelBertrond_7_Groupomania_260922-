import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userService } from '@/_services/user.service';

import Header from '@/components/header/Header';
import NavSign from '@/components/auth/NavSign';

import './auth.css'

const SignUp = () => {
    let navigate = useNavigate()

    const [user, setUser] = useState({
        name:'',
        firstName:'',
        pseudo:'',
        email:'',
        password:'',
        city:''
    })
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(user)
        userService.createUser(user)
            .then(res => {
                console.log(res)
                navigate('/admin/profile')
            })
            .catch(err => console.log(err)) 
    }

    const handlePasswordVisibility = (e) => {
        e.preventDefault();
        setPasswordIsVisible(!passwordIsVisible)
    };

    return (
        <div>
            <Header/>
            <div className='sign_container'>
                <div className='sign'>
                    <NavSign/>
                    <div className='form_container'>
                        <form className='form-sign' onSubmit={handleRegister}>
                            <div>
                                <label htmlFor='name'>Nom</label>
                                <input className='name-field'
                                    type='text' 
                                    name='name'
                                    value={user.name}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='firstName'>Prénom</label>
                                <input className='firstName-field'
                                    type='text' 
                                    name='firstName'
                                    value={user.firstName}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='pseudo'>Pseudo</label>
                                <input className='pseudo-field'
                                    type='text' 
                                    name='pseudo'
                                    value={user.pseudo}
                                    onChange={onChange} 
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input className='email-field'
                                    type='text' 
                                    name='email'
                                    value={user.email}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='city'>Ville</label>
                                <input className='city-field'
                                    type='text' 
                                    name='city'
                                    value={user.city}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <div className='password_container'>
                                    <input className='password-field'
                                        type={passwordIsVisible ? 'text' : 'password'} 
                                        name='password'
                                        value={user.password}
                                        onChange={onChange}  
                                    />
                                    <div className='show-password-btn_container'>
                                        <button className='show-password-btn' value={passwordIsVisible} onClick={handlePasswordVisibility}>
                                            {passwordIsVisible ? <i className="fa-solid fa-eye"></i>
                                            : <i className="fa-regular fa-eye-slash"></i>
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className='message_error'></div>
                            </div>

                            <input className='submit-btn' type='submit' value='Inscription' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;