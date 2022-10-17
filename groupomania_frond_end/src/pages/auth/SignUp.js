import React, { useState } from 'react';
import Header from '@/components/header/Header';
import NavSign from '@/components/auth/NavSign';

import './auth.css'

const SignUp = () => {

    const [credentials, setCredentials] = useState({
        name:'',
        firstName:'',
        pseudo:'',
        email:'',
        city:'',
        password:''
    })
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('formulaire')
        console.log(credentials)
        
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
                        <form onSubmit={handleRegister}>
                            <div>
                                <label htmlFor='name'>Nom</label>
                                <input className='name-field'
                                    type='text' 
                                    name='name'
                                    value={credentials.name}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='firstName'>Prénom</label>
                                <input className='firstName-field'
                                    type='text' 
                                    name='firstName'
                                    value={credentials.firstName}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='pseudo'>Pseudo</label>
                                <input className='pseudo-field'
                                    type='text' 
                                    name='pseudo'
                                    value={credentials.pseudo}
                                    onChange={onChange} 
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input className='email-field'
                                    type='text' 
                                    name='email'
                                    value={credentials.email}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='city'>Ville</label>
                                <input className='city-field'
                                    type='text' 
                                    name='city'
                                    value={credentials.city}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input className='password-field'
                                    type={passwordIsVisible ? 'text' : 'password'} 
                                    name='password'
                                    value={credentials.password}
                                    onChange={onChange}  
                                />
                                <div className='message_error'></div>
                            </div>
                            <input className='submit-btn' type='submit' value='Se connecter' />
                        </form>
                        <div className='show-password-btn-up_container'>
                            <input className='show-password-btn-up' 
                                type='submit' 
                                value={passwordIsVisible ? 'Hide' : 'Show' }
                                onClick={handlePasswordVisibility} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;