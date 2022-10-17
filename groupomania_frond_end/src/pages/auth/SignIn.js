import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { accountService } from '@/_services/account.service';

import Header from '@/components/header/Header';
import NavSign from '@/components/auth/NavSign';

import './auth.css'

const SignIn = () => {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    })
    const [passwordIsVisible, setPasswordIsVisible] = useState(false)

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('formulaire')
        console.log(credentials)
        axios.post(`${process.env.REACT_APP_API_URL}auth/login`, credentials)
            .then(res => {
                console.log(res)
                accountService.saveToken(res.data.access_token)
                navigate('/admin/home')
            })
            .catch(error => console.log(error))
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
                        <form onSubmit={handleLogin}>
                            <div className='email'>
                                <label htmlFor='email'>Email</label>
                                <input className='email-field'
                                    type='text' 
                                    name='email'
                                    value={credentials.email}
                                    onChange={onChange} 
                                />
                                <div className='message_error'></div>
                            </div>
                            <div className='password'>
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
                        <div className='show-password-btn-in_container'>
                            <input className='show-password-btn-in' 
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

export default SignIn;