import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav.css'

const Nav = () => {


    return (
        <nav className='nav_main'>
            <ul>
                <li>
                    <NavLink to='/admin/home' className={({isActive}) => isActive ? 'enable-btns-Nav' : 'disable-btns-Nav'}>
                        Accueil
                    </NavLink> 
                </li>
                <li>
                    <NavLink to='/admin/profile' className={({isActive}) => isActive ? 'enable-btns-Nav' : 'disable-btns-Nav'}>
                        Votre Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;