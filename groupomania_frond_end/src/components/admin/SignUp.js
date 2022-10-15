import React, { useState } from 'react';
import './signup.css'

const SignUp = () => {
    const [name, setName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')

    const handleRegistration = (e) => {

    }

    return (
        <form action="" onSubmit={handleRegistration} id='sign-up-form'>
            <label htmlFor='name'>Nom</label>
            <br/>
            <input className='name-field'
                type='text' 
                name='name' 
                id='name' 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
            />
            <br/>
            <label htmlFor='firstName'>Prénom</label>
            <br/>
            <input className='firstName-field'
                type='text' 
                name='firstName' 
                id='firstName' 
                onChange={(e) => setFirstName(e.target.value)} 
                value={firstName} 
            />
            <br/>
            <label htmlFor='pseudo'>Pseudo</label>
            <br/>
            <input className='pseudo-field'
                type='text' 
                name='pseudo' 
                id='pseudo' 
                onChange={(e) => setPseudo(e.target.value)} 
                value={pseudo} 
            />
            <br/>
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
            <label htmlFor='city'>Ville</label>
            <br/>
            <input className='city-field'
                type='text' 
                name='city' 
                id='city' 
                onChange={(e) => setCity(e.target.value)} 
                value={city} 
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
            <br/>
            <input type='checkbox' id='terms' />
            <label htmlFor='terms'>J'accepte les <a href='/' target='_bank'
            rel='noopener noreferrer'>conditions générales</a></label>
            
            <input className='submit-btn' type='submit' value={ `S'inscrire`} />
        </form>
    );
};

export default SignUp;