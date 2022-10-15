import React, { useState } from 'react';
import './nav.css'
import { Link } from 'react-router-dom';

const Nav = () => {

    const [home, setHome] = useState(true);
    const [profile, setProfile] = useState(false);

    const handleNavButton = (e) => {
        if(e.target.id === "home") {
            setHome(true)
            setProfile(false)
        } else if (e.target.id === "profile") {
            setHome(false)
            setProfile(true)
        }
    }

    return (
        <nav className='nav_main'>
            <ul>
                <li>
                    <Link to='/home' onClick={handleNavButton} id='home' className={home ? 'enable-btns-Nav' : 'disable-btns-Nav'}>
                        Accueil
                    </Link> 
                </li>
                <li>
                    <Link to='/profile' onClick={handleNavButton} id='profile' className={profile ? 'enable-btns-Nav' : 'disable-btns-Nav'}>
                        Votre Profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;