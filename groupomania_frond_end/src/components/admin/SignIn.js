import React, { useState } from 'react';
import './signin.css'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {

    }

    return (
        <form action="" onSubmit={handleLogin} id='sign-in-form'>
            <label htmlFor='email'>Email</label>
            <br/>
            <input className='email-field'
                type='text' 
                name='email' 
                id='email' 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />
            <br/>
            <label htmlFor='password'>Password</label>
            <br/>
            <input className='password-field'
                type='text' 
                name='password' 
                id='password' 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            <input className='submit-btn' type='submit' value='Se connecter' />
        </form>
    );
};

export default SignIn;

//<div className='email error'></div>
//<div className='password error'></div>