import React, { useState } from 'react';
import './editprofile.css'
import iconEdit from '@/icons/icon_update.svg'
import UploadImg from './UploadImg';

const EditProfile = () => {
    const [name, setName] = useState('Leroux')
    const [firstName, setFirstName] = useState('Jean')
    const [pseudo, setPseudo] = useState('Joka')
    const [email, setEmail] = useState('leroux@jean.fr')
    const [city, setCity] = useState('Bordeaux')
    const [password, setPassword] = useState('*******')

    const handleRegistration = (e) => {

    }

    return (
        <div className='edit'>
            <div className='profile_picture'>
                <h3>Photo de profile</h3>
                <div className='picture'></div>
                <UploadImg/>
            </div>
            <div>
                <form action="" onSubmit={handleRegistration} id='sign-up-form'>
                    <label htmlFor='name'>Nom:</label>
                    <br/>
                    <input className='name-field_profile'
                        type='text' 
                        name='name' 
                        id='name' 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                    />
                    <br/>
                    <label htmlFor='firstName'>Prénom:</label>
                    <br/>
                    <input className='firstName-field_profile'
                        type='text' 
                        name='firstName' 
                        id='firstName' 
                        onChange={(e) => setFirstName(e.target.value)} 
                        value={firstName} 
                    />
                    <br/>
                    <label htmlFor='pseudo'>Pseudo:</label>
                    <br/>
                    <input className='pseudo-field_profile'
                        type='text' 
                        name='pseudo' 
                        id='pseudo' 
                        onChange={(e) => setPseudo(e.target.value)} 
                        value={pseudo} 
                    />
                    <br/>
                    <label htmlFor='email'>Email:</label>
                    <br/>
                    <input className='email-field_profile'
                        type='text' 
                        name='email' 
                        id='email' 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                    />
                    <br/>
                    <label htmlFor='city'>Ville:</label>
                    <br/>
                    <input className='city-field_profile'
                        type='text' 
                        name='city' 
                        id='city' 
                        onChange={(e) => setCity(e.target.value)} 
                        value={city} 
                    />
                    <br/>
                    <label htmlFor='password'>Password:</label>
                    <br/>
                    <input className='password-field_profile'
                        type='text' 
                        name='password' 
                        id='password' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                    />
                    <br/>
                    <input className='submit-btn' type='submit' value='Modifier profile' />
                </form>
                <div className='iconeupdate'>
                        <img src={iconEdit} alt='Icon edit'/>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;