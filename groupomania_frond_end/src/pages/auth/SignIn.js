import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const [passwordIsVisible, setPasswordIsVisible] = useState(true)

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

/******************** Connexion au compte + envoi du token stocké dans le local storage  ************************/
    
    const handleLogin = (e) => {
        e.preventDefault();
        accountService.login(credentials)
            .then(res => {
                //console.log(res)
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
                        <form className='form-sign' onSubmit={handleLogin}>
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
                                <div className='password_container'>
                                    <input className='password-field'
                                        type={passwordIsVisible ? 'text' : 'password'} 
                                        name='password'
                                        value={credentials.password}
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
                            <input className='submit-btn' type='submit' value='Se connecter' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;