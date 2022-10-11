import React from 'react';
import './nav.css'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className='nav_main'>
            <ul className='links_list_main'>
                <li className='link_main'><Link to='/home'>Accueil</Link> </li>
                <li className='link_main'><Link to='/profile'>Votre Profile</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;